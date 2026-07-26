# Lab5

文件系统教程分为四个部分。

1. MMIO

   **操作系统如何与硬件设备（控制台和磁盘）进行数据交互？**

   在 MIPS 体系结构中，外设寄存器被映射到特定的物理地址空间。CPU 像访问普通内存一样，通过 lw 和 sw指令读写这些物理地址，从而达到控制外设的目的。

   MOS 采用微内核设计，文件系统服务运行在用户态，无法直接访问系统内核段地址空间（如 0xB80001F0）。若直接读写将引发地址异常（AdEL/AdES）。因此，必须通过系统调用 `sys_write_dev` 和 `sys_read_dev` 陷入内核，由内核在 `kseg1` 空间代表用户进程完成读写。

   

2. 磁盘文件系统布局

   本部分解决的问题是：**如何将文件和目录在物理磁盘块上组织起来？**

   ```text
   Disk Block 0: Boot Sector / Partition Table
   Disk Block 1: Super Block (struct Super)
   Disk Block 2..N: Bitmap Blocks (1 = free, 0 = allocated)
   Disk Block N+1..: Data Blocks (containing struct File or raw data)
   ```



3. 虚拟内存的块缓存

   本部分解决的问题是：**如何避免频繁读写慢速的磁盘？**

   ```text
   虚拟地址空间: [0x10000000 (DISKMAP)] ---------------------> [0x50000000 (DISKMAX)]
                        |                                           |
                        v                                           v
   磁盘块索引:         Block 0      Block 1      Block 2 ...      Block N
   ```

   

4. 文件描述符与文件系统服务 (IPC)

   本部分解决的核心问题是：**用户进程如何以统一的接口（如 read/write）向文件系统发起请求？**

   ```
   [用户进程]                    [内核]                     [文件系统服务进程 (fs_serv)]
   |                           |                                   |
   |-- 1. 发起请求 (IPC) ------>|---------------------------------->|
   |                           |                                   | (处理请求)
   |<-- 2. 响应结果 (IPC) <-----|<----------------------------------|
   ```

## 磁盘块缓存

### 基本知识

2026年助教 SuperKamonto 有一个广为流传的教学视频，该视频决定从最困难的块缓存机制开始讲解，块缓存是整个文件系统中的大头，主要函数定义在`fs/fs.c`中。

首先我们需要知道磁盘的组织方式，只需要最基本知识即可：

- **扇区**是硬件的最小物理读写单位（512 字节）

- **磁盘块**是操作系统管理的虚拟逻辑单位。在 MOS 中，1 个 Block = 4096 字节（即 8 个物理扇区）。

- **Super Block**：存放整个文件系统的元数据，包含魔数、总块数以及根目录的 struct File 结构。
- **Bitmap**：管理空闲块。用 1 个 bit 对应 1 个 Block。在 MOS 中，总共有 1024 个块，需要 1024 个 bits（即 128 字节），因此只需要 1 个磁盘块就可以存放下整个位图。

磁盘块1024个，总计4MB，每个正好4KB一个页。一个典型的磁盘类似于以下 ascii 示意图，您可以认为它是一个巨大的连续一维空间。

```text
+--------------------------------------------+
|                                            |
|                                            |
|          File/Directory Data Blocks        |
|                                            |
|                                            |
+--------------------------------------------+
|              Free Block Bitmap             |
+--------------------------------------------+
|                 Super Block                |
+--------------------------------------------+
|         Boot Sector and Partition Table    |
+--------------------------------------------+
```

1. **Boot 引导块**：永远是磁盘的第 0 块。
   - **作用**：存放操作系统的引导程序（Bootloader）和分区表。文件系统在分配可用空间时，绝对不能触碰这一块。
2. **超级块**：永远是磁盘的第 1 块。
   - **作用**：整个文件系统的“元数据中心”。里面记录了文件系统的魔数、磁盘总块数，以及**根目录**所在的位置。
3. **位图块**：紧跟在超级块之后，从第 2 块开始（在本实验中，只有第 2 块是位图块）。
   - **作用**：里面存放的是由二进制位组成的数组。
4. **位图对应的块 **：事实上，**磁盘上的每一个块（包括第 0 块和第 1 块）都在位图中有一个对应的 bit 位**。位图中的第 k 个 bit，记录了全局第 k 个磁盘块是处于空闲状态（1）还是占用状态（0）。文件系统通过扫描这些 bit，就能知道去哪里寻找未被使用的物理磁盘块来存放新的文件数据。

在这个磁盘中，文件以文件控制块和逻辑块组织起来，其存在类似于页控制块和页，因此也被称为文件控制块和文件逻辑块。文件控制块的定义如下（`usr/include/fs.h`）

```c
struct File {
	char f_name[MAXNAMELEN]; // filename
	uint32_t f_size;	 // file size in bytes
	uint32_t f_type;	 // file type
	uint32_t f_direct[NDIRECT];
	uint32_t f_indirect;

	struct File *f_dir; // the pointer to the dir where this file is in, valid only in memory.
	char f_pad[FILE_STRUCT_SIZE - MAXNAMELEN - (3 + NDIRECT) * 4 - sizeof(void *)];
} __attribute__((aligned(4), packed));
```

其中各项的含义代表：

1. 文件名称，不可超过128字节
2. 文件大小，不包括文件控制块
3. 文件类型，包括`FTYPE_REG, FTYPE_DIR`
4. 文件内容所在的磁盘块编号，最大`NDIRECT`个
5. 间接索引，该块中存储了 `NINDIRECT` 个块指针，用于大文件的扩展[^1]，特别地，前十个槽位不存数据（故意的还是不小心？）
6. 文件占位符，让一个文件控制块占用恰好256个字节

超级块的定义如下：

```c
struct Super {
	uint32_t s_magic;   // Magic number: FS_MAGIC
	uint32_t s_nblocks; // Total number of blocks on disk
	struct File s_root; // Root directory node
};
```

其中各项的含义代表：

1. 魔法数字，详见[Triple Camera的溯源](https://triplecamera.github.io/2025/04/30/the-history-of-mos/)
2. `s_nblocks`，该磁盘总块数
3. `s_root`文件根节点

**通常情况下一个磁盘（或一个文件系统分区）只有一个超级块。**

### 控制磁盘块

传统的操作系统通常在内核中维护一个 Buffer Cache。MOS 采用了一种更精妙的设计：**利用虚拟内存映射来实现块缓存**。具体而言，系统分配了一段广阔的用户虚拟空间 [DISKMAP, DISKMAX)，大小为 1GB（相对于狭小的磁盘来说确实非常广阔）。磁盘上的第 `n` 个 Block，对应虚拟地址 `DISKMAP + n * BLOCK_SIZE`。每次需要加载就按需加载——当访问某个磁盘块对应的虚拟地址时，如果发现该虚拟地址尚未映射物理页面，文件系统进程会通过系统调用分配物理页，并调用驱动将磁盘数据读入该物理页。

借助页表项（PTE）中的 PTE_DIRTY 标志位，系统可以由硬件自动感知该缓存页是否被修改过。若被修改，在解除映射或同步磁盘时，将其写回磁盘。

这里涉及到的函数全都直接控制磁盘块为后续文件逻辑块与磁盘块的联系提供调用。

#### 物理地址层函数

这一层负责**与磁盘块**相关的虚拟地址的计算以及物理内存的分配与回收。

---

**`disk_addr`**：建立磁盘逻辑块号与虚拟地址空间之间的数学关系，块和地址一一对应。[^2]

基于线性映射公式，以 DISKMAP 为基址，加上偏移量即可。

```c
// Overview:
//  Return the virtual address of this disk block in cache.
void *disk_addr(u_int blockno) {
    /* Exercise 5.6: Your code here. */
    return (void*) (DISKMAP + blockno * BLOCK_SIZE);
}
```



**`map_block`**：当需要将磁盘块载入内存时，确保其对应的虚拟地址已分配了物理内存页。

首先通过 block_is_mapped 检查页表项。若未映射，则通过系统调用 syscall_mem_alloc 分配物理页，并赋予 PTE_D（可写）权限。

```c
// Overview:
//  Allocate a page to cache the disk block.
int map_block(u_int blockno) {
    /* Exercise 5.7: Your code here. (1/5) */
    if (block_is_mapped(blockno)) {
        return 0;
    }

    /* Exercise 5.7: Your code here. (2/5) */
    // 若未映射，向系统内核申请一页物理内存，映射到对应的虚拟地址
    return syscall_mem_alloc(0, disk_addr(blockno), PTE_D);
}
```



**`unmap_block`:**当内存资源紧张或文件被关闭时，解除物理页映射，回收内存，并保证数据一致性。

获取虚拟地址 -> 检查脏位（Dirty Bit） -> 若为脏且属于有效块，则写回磁盘 -> 解除物理内存映射。

```c
// Overview:
// Unmap a disk block in cache.
void unmap_block(u_int blockno) {
    /* Exercise 5.7: Your code here. (3/5) */
    void *va = block_is_mapped(blockno);
    if (va == NULL) return; // return if not mapped

    /* Exercise 5.7: Your code here. (4/5) */
    // !block_is_free: if free, the file is deleted
    // block_is_dirty: check flags
    if (!block_is_free(blockno) && block_is_dirty(blockno)) {
        write_block(blockno);
    }

    /* Exercise 5.7: Your code here. (5/5) */
    // unmap this memory
    syscall_mem_unmap(0, va);

    user_assert(!block_is_mapped(blockno));
}
```

#### 磁盘缓存IO同步

这一部分特别负责处理磁盘与内存的磁盘块交换，磁盘分配。

**`read_block` 与 `write_block`**

这部分代码已经给出，我们分析其设计思想：

**`write_block`**：通过 `ide_write` 将虚拟地址处的 4KB 数据写入物理磁盘的对应扇区（一个块对应 `SECT2BLK` 即 8 个扇区）。

*   写入完成后，执行 `syscall_mem_map(0, va, 0, va, PTE_D)`，此操作的作用是**清除硬件的 PTE_DIRTY 标志位**，标识该缓存页已与磁盘数据一致。

```c
// Overview:
//  Write the current contents of the block out to disk.
void write_block(u_int blockno) {
	// Step 1: detect is this block is mapped, if not, can't write it's data to disk.
	if (!block_is_mapped(blockno)) {
		user_panic("write unmapped block %08x", blockno);
	}

	// Step2: write data to IDE disk. (using ide_write, and the diskno is 0)
	void *va = disk_addr(blockno);
	ide_write(0, blockno * SECT2BLK, va, SECT2BLK);
	syscall_mem_map(0, va, 0, va, PTE_D);
```

**`read_block`**：此函数不仅负责通过 `ide_read` 读取数据，还通过一个指针参数 `isnew` 向调用者传递状态。如果 `isnew == 1`，说明数据是刚刚从磁盘载入的；如果 `isnew == 0`，说明直接命中了缓存。这在后续的文件结构操作中用于判断是否需要清理某些仅存在于内存中的临时变量。

```c
// Overview:
//  Make sure a particular disk block is loaded into memory.
//
// Post-Condition:
//  Return 0 on success, or a negative error code on error.
//
//  If blk!=0, set *blk to the address of the block in memory.
//
//  If isnew!=0, set *isnew to 0 if the block was already in memory, or
//  to 1 if the block was loaded off disk to satisfy this request. (Isnew
//  lets callers like file_get_block clear any memory-only fields
//  from the disk blocks when they come in off disk.)
//
// Hint:
//  use disk_addr, block_is_mapped, syscall_mem_alloc, and ide_read.
int read_block(u_int blockno, void **blk, u_int *isnew) {
	// Step 1: validate blockno. Make file the block to read is within the disk.
	if (super && blockno >= super->s_nblocks) {
		user_panic("reading non-existent block %08x\n", blockno);
	}

	// Step 2: validate this block is used, not free.
	if (bitmap && block_is_free(blockno)) {
		user_panic("reading free block %08x\n", blockno);
	}

	// Step 3: transform block number to corresponding virtual address.
	void *va = disk_addr(blockno);

	// Step 4: read disk and set *isnew.
	if (block_is_mapped(blockno)) { // the block is in memory
		if (isnew) {
			*isnew = 0;
		}
	} else { // the block is not in memory
		if (isnew) {
			*isnew = 1;
		}
		try(syscall_mem_alloc(0, va, PTE_D));
		ide_read(0, blockno * SECT2BLK, va, SECT2BLK);
	}

	// Step 5: if blk != NULL, assign 'va' to '*blk'.
	if (blk) {
		*blk = va;
	}
	return 0;
}
```

**`free_block`**：在位图中将物理块标记为空闲，并将其从内存缓存中解绑（若存在）。

```c
void free_block(u_int blockno) {
	// You can refer to the function 'block_is_free' above.
	// Step 1: If 'blockno' is invalid (0 or >= the number of blocks in 'super'), return.
	/* Exercise 5.4: Your code here. (1/2) */

	if (blockno == 0 || blockno >= super->s_nblocks) {
		return;
	}
	// Step 2: Set the flag bit of 'blockno' in 'bitmap'.
	// Hint: Use bit operations to update the bitmap, such as b[n / W] |= 1 << (n % W).
	/* Exercise 5.4: Your code here. (2/2) */
	bitmap[blockno / 32] |= 1 << (blockno % 32);

	write_block(blockno / BLOCK_SIZE_BIT + 2);

	if (block_is_mapped(blockno)) {
		unmap_block(blockno);
	}
}
```



**`alloc_block`**：遍历位图寻找空闲块标记为占用，并映射至内存。

```c
// Overview:
//  Allocate a block -- first find a free block in the bitmap, then map it into memory.
int alloc_block(void) {
	int r, bno;
	// Step 1: find a free block.
	if ((r = alloc_block_num()) < 0) { // failed.
		return r;
	}
	bno = r;

	// Step 2: map this block into memory.
	if ((r = map_block(bno)) < 0) {
		free_block(bno);
		return r;
	}

	// Step 3: return block number.
	return bno;
}
```



**其他辅助函数**：

**`va_is_mapped`**：调用神奇的自映射检查某虚拟地址是否有效（已经映射）；

**`va_is_dirty`**：调用神奇的自映射和`va_is_mapped`函数检查某虚拟地址处是否已被映射且为`DIRTY`[^3]

**`block_is_dirty`**：传入`blockno`并转换为虚拟地址，检查是否为`dirty`；

**`dirty_block`**：传入`blockno`检查，并将其修改为`PTE_DIRTY | PTE_D`；

**`block_is_free`**：传入`blockno`检查，并检查位图中这个`block`是否是空闲的；

**`alloc_block_num`**：`void`参数，检查`bitmap`并分配第一个空闲位图位置；



### 逻辑映射函数

磁盘块和文件块的组织，正是另一种分页机制中的“逻辑连续，实则离散”。

- **逻辑上**：当我们调用 `read(fd, buffer, size)` 读取一个大文件时，文件系统在逻辑上是依次读取该文件的 `filebno = 0，filebno = 1，filebno = 2...` 逻辑块的编号是**严格连续**的。
- **物理上**：为了避免外部碎片并提高空间利用率，这些逻辑块背后的数据，实际上被塞在了磁盘上任意空闲的 `diskbno` 中。例如，`filebno = 0` 可能存放在 `diskbno = 85`，而 `filebno = 1` 可能存放在 `diskbno = 12`。物理块的分布是**完全离散**的。

如同虚拟内存中“页表”负责将虚拟页映射到物理页框，在文件系统中，文件控制块FCB充当了“页表”的角色。

回顾 struct File 的定义：

```c
struct File {
    ...
    uint32_t f_direct[10]; // 直接指针
    uint32_t f_indirect;   // 间接指针
    ...
};
```

当系统需要读取文件的逻辑第 1 块（`filebno = 1`）时，它会去查看 FCB 中的 `f_direct[1]`。如果里面存的数字是 12，系统就知道这个文件的第 1 个逻辑块，存放在全局磁盘的第 12 个物理块上。于是它去磁盘驱动中请求读取 `diskbno = 12`：

```text
[用户视图连续]
文件数据:   [逻辑块 0] | [逻辑块 1] | [逻辑块 2] | ...
                |            |            |
                v            v            v
[映射]      f_direct[0]  f_direct[1]  f_direct[2]    <--- 存放在 FCB中
                = 85         = 12         = 104
                |            |            |
                +------------+------------+
                             |
[磁盘视图离散]                 v
全局磁盘块: [0: Boot] | [1: Super] | [2: Bitmap] | ... | [12: 数据] | ... | [85: 数据] | ... | [104: 数据]
```

**`file_block_walk`**：根据文件的逻辑块号，寻址并返回保存该映射关系的 FCB 指针槽位。

这个函数很类似于`pgdir_walk`函数，首先检查`fileno`文件逻辑号是否在直接指针范围内，是则直接返回，否则进入间接指针：

1. 在间接指针中查找，如果间接指针没有初始化根据`alloc`决定是分配新的还是返回
2. 一旦继续查找，调用`alloc_block`，并更新`f->f_indirect`，标记为脏磁盘块，

```c
// Overview:
//  Like pgdir_walk but for files.
//  Find the disk block number slot for the 'filebno'th block in file 'f'. Then, set
//  '*ppdiskbno' to point to that slot. The slot will be one of the f->f_direct[] entries,
//  or an entry in the indirect block.
//  When 'alloc' is set, this function will allocate an indirect block if necessary.
//
// Post-Condition:
//  Return 0 on success, and set *ppdiskbno to the pointer to the target block.
//  Return -E_NOT_FOUND if the function needed to allocate an indirect block, but alloc was 0.
//  Return -E_NO_DISK if there's no space on the disk for an indirect block.
//  Return -E_NO_MEM if there's not enough memory for an indirect block.
//  Return -E_INVAL if filebno is out of range (>= NINDIRECT).
int file_block_walk(struct File *f, u_int filebno, uint32_t **ppdiskbno, u_int alloc) {
	int r;
	uint32_t *ptr;
	uint32_t *blk;

	if (filebno < NDIRECT) {
		// Step 1: if the target block is corresponded to a direct pointer, just return the
		// disk block number.
		ptr = &f->f_direct[filebno];
	} else if (filebno < NINDIRECT) {
		// Step 2: if the target block is corresponded to the indirect block, but there's no
		//  indirect block and `alloc` is set, create the indirect block.
		if (f->f_indirect == 0) {
			if (alloc == 0) {
				return -E_NOT_FOUND;
			}

			if ((r = alloc_block()) < 0) {
				return r;
			}
			f->f_indirect = r;
			dirty_fcb(f);
		}

		// Step 3: read the new indirect block to memory.
		if ((r = read_block(f->f_indirect, (void **)&blk, 0)) < 0) {
			return r;
		}
		ptr = blk + filebno;
	} else {
		return -E_INVAL;
	}

	// Step 4: store the result into *ppdiskbno, and return 0.
	*ppdiskbno = ptr;
	return 0;
}
```

特别的是，这里`ptr = blk + filebno`意味着前十个槽位不会被写入，这和我们之前的规范是一致的。

**`file_map_block`**：该函数调用`walk`获取槽位，若槽位为空且允许分配，则申请新物理块，最终返回物理块号。是不是有点像`page_insert`？

```c
// OVerview:
//  Set *diskbno to the disk block number for the filebno'th block in file f.
//  If alloc is set and the block does not exist, allocate it.
//
// Post-Condition:
//  Returns 0: success, < 0 on error.
//  Errors are:
//   -E_NOT_FOUND: alloc was 0 but the block did not exist.
//   -E_NO_DISK: if a block needed to be allocated but the disk is full.
//   -E_NO_MEM: if we're out of memory.
//   -E_INVAL: if filebno is out of range.
int file_map_block(struct File *f, u_int filebno, u_int *diskbno, u_int alloc) {
	int r;
	uint32_t *ptr;

	// Step 1: find the pointer for the target block.
	if ((r = file_block_walk(f, filebno, &ptr, alloc)) < 0) {
		return r;
	}

	// Step 2: if the block not exists, and create is set, alloc one.
	if (*ptr == 0) {
		if (alloc == 0) {
			return -E_NOT_FOUND;
		}

		if ((r = alloc_block()) < 0) {
			return r;
		}
		*ptr = r;
	}

	// Step 3: set the pointer to the block in *diskbno and return 0.
	*diskbno = *ptr;
	return 0;
}
```



**`file_get_block`**：获取逻辑块对应的物理块号，将其内容读入内存缓存区供上层使用。有点像`page_lookup`；

```c
int file_get_block(struct File *f, u_int filebno, void **blk) {
	int r;
	u_int diskbno;
	u_int isnew;

	// Step 1: find the disk block number is `f` using `file_map_block`.
	if ((r = file_map_block(f, filebno, &diskbno, 1)) < 0) {
		return r;
	}

	// Step 2: read the data in this disk to blk.
	if ((r = read_block(diskbno, blk, &isnew)) < 0) {
		return r;
	}
	return 0;
}
```

**`file_clear_block`**：释放特定逻辑块对应的物理磁盘块，并将 FCB 中的映射指针置零。简直就是`page_free`。

```c
int file_clear_block(struct File *f, u_int filebno) {
	int r;
	uint32_t *ptr;

    // find ptr and no need to create, we delete here
	if ((r = file_block_walk(f, filebno, &ptr, 0)) < 0) {
		return r;
	}

	if (*ptr) {
		free_block(*ptr);
		*ptr = 0;
	}

	return 0;
}
```



**辅助函数**：

**`dirty_fcb`**：将文件FCB的父目录磁盘块标记为脏页以便于后续写回

### 文件函数

这里这些函数直接操作文件或辅助操作文件

#### 目录解析

**`dir_lookup`**：这个函数遍历目录文件的所有数据块，比对 `f_name` 寻找目标子文件/目录。

```c
// Overview:
//  Find a file named 'name' in the directory 'dir'. If found, set *file to it.
//
// Post-Condition:
//  Return 0 on success, and set the pointer to the target file in `*file`.
//  Return the underlying error if an error occurs.
int dir_lookup(struct File *dir, char *name, struct File **file) {
	// Step 1: Calculate the number of blocks in 'dir' via its size.
	u_int nblock;
	nblock = dir->f_size / BLOCK_SIZE;

	// Step 2: Iterate through all blocks in the directory.
	for (int i = 0; i < nblock; i++) {
		// Read the i'th block of 'dir' and get its address in 'blk' using 'file_get_block'.
		void *blk;

		int r = file_get_block(dir, i, &blk);
		if (r != 0) return r;

		struct File *files = (struct File *)blk;

		// Find the target among all 'File's in this block.
		for (struct File *f = files; f < files + FILE2BLK; ++f) {
			// Compare the file name against 'name' using 'strcmp'.
			// If we find the target file, set '*file' to it and set up its 'f_dir'
			// field.
            if (f->f_name[0] != '\0' && strcmp(f->f_name, name) == 0) {
				*file = f;
				f->f_dir = dir;
				return 0; 
			}

		}
	}
	return -E_NOT_FOUND;
}
```



**`dir_alloc_file`**：在父目录下寻找一个空闲的`struct File`槽位，满则触发扩容。

一个目录文件的大小（`dir->f_size`）决定了它拥有多少个磁盘块。每个 4KB 的磁盘块能存放多个 `struct File` 结构（`FILE2BLK` 个）。

函数首先遍历目录现有的所有块，读入缓存。检查每个 `struct File` 的 `f_name[0]` 是否为 `'\0'`。如果是，说明这是一个未被占用的槽位，直接返回。

如果现有的块都满了，说明目录需要扩充空间以容纳新文件。此时将目录的大小 `f_size` 增加一个 `BLOCK_SIZE`，并将目录本身标记为脏（`dirty_fcb`）。然后调用 `file_get_block` 读取这个新块（它底层会触发 `alloc_block` 分配新的物理磁盘块）。由于是新块，其内容全为 0，所以第一个槽位必然是空闲的，返回之。

```c
int dir_alloc_file(struct File *dir, struct File **file) {
	int r;
	u_int nblock, i, j;
	void *blk;
	struct File *f;

	nblock = dir->f_size / BLOCK_SIZE;

	for (i = 0; i < nblock; i++) {
		// read the block.
		if ((r = file_get_block(dir, i, &blk)) < 0) {
			return r;
		}

		f = blk;

		for (j = 0; j < FILE2BLK; j++) {
			if (f[j].f_name[0] == '\0') { // found free File structure.
				*file = &f[j];
				return 0;
			}
		}
	}

	// no free File structure in exists data block.
	// new data block need to be created.
	dir->f_size += BLOCK_SIZE; // increase the size
	dirty_fcb(dir);
	if ((r = file_get_block(dir, i, &blk)) < 0) {
		return r;
	}
	f = blk;
	*file = &f[0];

	return 0;
}
```



**`walk_path`**：自顶向下解析绝对路径，逐级调用 `dir_lookup` 寻找最终的目标文件及其父目录。根据字符串形式的绝对路径（如 `/usr/bin/test`），从根目录开始逐层向下寻找，最终找到目标文件及其所在的父目录。

函数始终从超级块中记录的根目录 `super->s_root` 开始（`file = &super->s_root`）。利用循环，跳过多余的斜杠 `/`，提取出当前层级的目录/文件名称存入 `name` 数组。如果当前层级不是最后一层，它必须是一个目录（检查 `FTYPE_DIR`）。调用 `dir_lookup(dir, name, &file)` 在当前目录中检索刚刚提取出的 `name`。

如果找完了所有路径元素且都存在，返回目标文件（`*pfile`）及其父目录（`*pdir`）。如果在找最后一级时没找到，返回 `-E_NOT_FOUND`，并聪明地返回其父目录（用`*pdir`），将最后未找到的文件名存入 `lastelem`。这个设计非常巧妙，因为当我们要**创建新文件**时，正是需要找到其父目录和待创建的文件名！

```c
int walk_path(char *path, struct File **pdir, struct File **pfile, char *lastelem) {
	char *p;
	char name[MAXNAMELEN];
	struct File *dir, *file;
	int r;

	// start at the root.
	path = skip_slash(path);
	file = &super->s_root;
	dir = 0;
	name[0] = 0;

	if (pdir) {
		*pdir = 0;
	}

	*pfile = 0;

	// find the target file by name recursively.
	while (*path != '\0') {
		dir = file;
		p = path;

		while (*path != '/' && *path != '\0') {
			path++;
		}

		if (path - p >= MAXNAMELEN) {
			return -E_BAD_PATH;
		}

		memcpy(name, p, path - p);
		name[path - p] = '\0';
		path = skip_slash(path);
		if (dir->f_type != FTYPE_DIR) {
			return -E_NOT_FOUND;
		}

		if ((r = dir_lookup(dir, name, &file)) < 0) {
			if (r == -E_NOT_FOUND && *path == '\0') {
				if (pdir) {
					*pdir = dir;
				}

				if (lastelem) {
					strcpy(lastelem, name);
				}

				*pfile = 0;
			}

			return r;
		}
	}

	if (pdir) {
		*pdir = dir;
	}

	*pfile = file;
	return 0;
}

```

#### 文件生命周期函数

**`file_open(char *path, struct File **file)`**：非常薄的封装，直接调用 `walk_path(path, 0, file, 0)`。如果找到了，通过指针 `file` 返回。

```c
// Overview:
//  Open "path".
//
// Post-Condition:
//  On success set *pfile to point at the file and return 0.
//  On error return < 0.
int file_open(char *path, struct File **file) {
	return walk_path(path, 0, file, 0);
}
```

**`file_create(char *path, struct File **file)`**

*   **步骤 1**：调用 `walk_path`。如果返回值是 `0`，说明文件已存在，返回 `-E_FILE_EXISTS` 报错。
*   **步骤 2**：如果返回值是 `-E_NOT_FOUND`，且 `walk_path` 成功提取了父目录 `dir` 和文件名 `name`，则开始创建。
*   **步骤 3**：调用上面讲过的 `dir_alloc_file(dir, &f)`，在父目录中申请一个空的 FCB 槽位。
*   **步骤 4**：初始化这个新 FCB。设置文件名、大小设为 0、类型设为普通文件 `FTYPE_REG`，清理直接和间接指针。
*   **步骤 5**：极其重要的一步！调用 `dirty_fcb(f)` 标记新文件所在的目录块为脏，并调用 `file_flush(f->f_dir)` 将该父目录块立即写回磁盘，保证文件创建操作在磁盘上的持久化。

```c
// Overview:
//  Create "path".
//
// Post-Condition:
//  On success set *file to point at the file and return 0.
//  On error return < 0.
int file_create(char *path, struct File **file) {
	char name[MAXNAMELEN];
	int r;
	struct File *dir, *f;

	if ((r = walk_path(path, &dir, &f, name)) == 0) {
		return -E_FILE_EXISTS;
	}

	if (r != -E_NOT_FOUND || dir == 0) {
		return r;
	}

	if (dir_alloc_file(dir, &f) < 0) {
		return r;
	}

	strcpy(f->f_name, name);
	f->f_size = 0;
	f->f_type = FTYPE_REG;
	for (int i = 0; i < NDIRECT; i++) {
		f->f_direct[i] = 0;
	}
	f->f_indirect = 0;
	f->f_dir = dir;

	dirty_fcb(f);
	if (f->f_dir) {
		file_flush(f->f_dir);
	}
	*file = f;
	return 0;
}

```

接下来截断文件和设置大小涉及两个函数：

*   **`file_truncate(struct File *f, u_int newsize)`**
    *   **作用**：将文件大小缩小到 `newsize`，并释放那些由于文件变小而不再需要的物理磁盘块。
    *   **实现过程**：
        1. 计算截断前占用的物理块数 `old_nblocks` 和截断后需要的物理块数 `new_nblocks`。
        2. 从 `new_nblocks` 遍历到 `old_nblocks - 1`，逐个调用 `file_clear_block(f, bno)`，将其物理块释放并在 FCB 中切断映射。
        3. 如果截断后，文件变得足够小，不再需要间接指针块（`new_nblocks <= NDIRECT`），则连间接指针指向的索引物理块也一并释放（`free_block(f->f_indirect)`），并将其指针置空。
        4. 最后更新 `f->f_size = newsize` 并标记 FCB 为脏。
*   **`file_set_size(struct File *f, u_int newsize)`**
    *   如果 `newsize` 比原来小，直接调用 `file_truncate`。
    *   如果 `newsize` 比原来大，其实不需要立刻分配所有新增的物理块（按需分配特性），只需修改 `f->f_size` 并标记 FCB 变脏即可。当后续向这些新扩展的空间写入数据时，底层 `file_map_block` 会自动为它们分配物理块。

```c
// Overview:
//  Truncate file down to newsize bytes.
//
//  Since the file is shorter, we can free the blocks that were used by the old
//  bigger version but not by our new smaller self. For both the old and new sizes,
//  figure out the number of blocks required, and then clear the blocks from
//  new_nblocks to old_nblocks.
//
//  If the new_nblocks is no more than NDIRECT, free the indirect block too.
//  (Remember to clear the f->f_indirect pointer so you'll know whether it's valid!)
//
// Hint: use file_clear_block.
void file_truncate(struct File *f, u_int newsize) {
	u_int bno, old_nblocks, new_nblocks;

	old_nblocks = ROUND(f->f_size, BLOCK_SIZE) / BLOCK_SIZE;
	new_nblocks = ROUND(newsize, BLOCK_SIZE) / BLOCK_SIZE;

	if (newsize == 0) {
		new_nblocks = 0;
	}

	if (new_nblocks <= NDIRECT) {
		for (bno = new_nblocks; bno < old_nblocks; bno++) {
			panic_on(file_clear_block(f, bno));
		}
		if (f->f_indirect) {
			free_block(f->f_indirect);
			f->f_indirect = 0;
		}
	} else {
		for (bno = new_nblocks; bno < old_nblocks; bno++) {
			panic_on(file_clear_block(f, bno));
		}
	}
	f->f_size = newsize;
	dirty_fcb(f);
}
```

最后，还需要及时写回磁盘：

*   **`file_flush(struct File *f)`**
    *   **作用**：将一个文件在内存缓存中的所有修改（数据块的改动）强制同步到磁盘。
    *   **实现**：遍历文件的所有逻辑块，调用 `file_map_block` 获取其所在的物理磁盘块号。接着通过 `block_is_dirty` 检查该页对应的虚拟内存是否被修改过。如果是，调用 `write_block` 发起一次实际的磁盘写 I/O。
*   **`fs_sync(void)`**
    *   更暴力的同步。遍历磁盘从第 0 块到最后一块，只要发现该物理块对应的缓存在内存中是脏的，全部写回。通常在文件系统安全卸载或发生严重错误前调用。
*   **`file_close(struct File *f)`**
    *   **步骤 1**：调用 `file_flush` 将该文件的所有脏数据写回。
    *   **步骤 2**：如果是普通文件，遍历其所有块，调用 `unmap_block` 将它们从虚拟内存中解除映射，释放物理内存页。这也是为了防止内存耗尽，实现了“打开时加载到内存，关闭时释放内存”。

```c
// Overview:
//  Flush the contents of file f out to disk.
//  Loop over all the blocks in file.
//  Translate the file block number into a disk block number and then
//  check whether that disk block is dirty. If so, write it out.
//
// Hint: use file_map_block, block_is_dirty, and write_block.
void file_flush(struct File *f) {
	u_int nblocks;
	u_int bno;
	u_int diskbno;
	int r;

	nblocks = ROUND(f->f_size, BLOCK_SIZE) / BLOCK_SIZE;

	for (bno = 0; bno < nblocks; bno++) {
		if ((r = file_map_block(f, bno, &diskbno, 0)) < 0) {
			continue;
		}
		if (block_is_dirty(diskbno)) {
			write_block(diskbno);
		}
	}
}
```

在理解了基础后，我们就能完美分析，如何从磁盘上抹除一个文件。

```c
// Overview:
//  Remove a file by truncating it and then zeroing the name.
int file_remove(char *path) {
	int r;
	struct File *f;

	// Step 1: find the file on the disk.
	if ((r = walk_path(path, 0, &f, 0)) < 0) {
		return r;
	}

	// Step 2: truncate it's size to zero.
	file_truncate(f, 0);

	// Step 3: clear it's name.
	f->f_name[0] = '\0';

	// Step 4: flush f's f_dir.
	dirty_fcb(f);
	if (f->f_dir) {
		file_flush(f->f_dir);
	}

	return 0;
}
```

### `fs.c`函数总结表


| 层级                                                  | 函数名           | 核心作用与逻辑简述                                           |
| ----------------------------------------------------- | ---------------- | ------------------------------------------------------------ |
| **1. 物理映射与缓存层**<br>*(操作虚拟内存与磁盘映射)* | disk_addr        | **计算虚拟地址**：将给定的磁盘块号线性映射为 1GB 缓存区中的虚拟地址。 |
|                                                       | map_block        | **分配内存页**：为指定磁盘块所在的虚拟地址申请一页物理内存，建立缓存。 |
|                                                       | unmap_block      | **回收内存页**：检查脏位，若脏且有效则写回磁盘，随后解除物理内存映射。 |
|                                                       | read_block       | **读取块**：若块未映射，则分配物理页并调用 IDE 驱动将数据从磁盘读入内存。 |
|                                                       | write_block      | **写入块**：调用 IDE 驱动将缓存页的数据写回物理扇区，并清除脏标志（Dirty Bit）。 |
|                                                       | alloc_block      | **申请块**：遍历位图寻找空闲块标记为占用，并映射至内存。     |
|                                                       | free_block       | **释放块**：在位图中将物理块标记为空闲，并将其从内存缓存中解绑（若存在）。 |
| **2. 逻辑索引映射层**<br>*(操作 FCB 与逻辑块)*        | file_block_walk  | **定位槽位**：根据文件的逻辑块号，寻址并返回保存该映射关系的 FCB 指针槽位。 |
|                                                       | file_map_block   | **逻辑转物理**：利用 walk 获取槽位，若槽位为空且允许分配，则申请新物理块，最终返回物理块号。 |
|                                                       | file_get_block   | **获取数据块**：获取逻辑块对应的物理块号，并将其内容读入内存缓存区供上层使用。 |
|                                                       | file_clear_block | **解除逻辑块**：释放特定逻辑块对应的物理磁盘块，并将 FCB 中的映射指针置零。 |
|                                                       | dirty_fcb        | **标记脏结构**：找到包含该文件 FCB 的父目录磁盘块，将其标记为脏页以便后续写回。 |
| **3. 目录与路径解析层**<br>*(树形结构检索)*           | dir_lookup       | **目录检索**：遍历目录文件的所有数据块，比对 f_name 寻找目标子文件/目录。 |
|                                                       | dir_alloc_file   | **新建目录项**：在父目录下寻找空闲的 struct File 槽位；若满则触发目录自动扩容。 |
|                                                       | walk_path        | **路径引擎**：自顶向下解析绝对路径，逐级调用 dir_lookup 寻找最终的目标文件及其父目录。 |
| **4. 文件生命周期层**<br>*(面向用户的 CRUD)*          | file_create      | **创建文件**：通过 walk_path 定位父目录，利用 dir_alloc_file 初始化新 FCB 并立即落盘。 |
|                                                       | file_truncate    | **截断文件**：利用 file_clear_block 将文件截断至指定大小，释放多余的物理数据块与间接索引块。 |
|                                                       | file_flush       | **强制同步**：遍历文件所有的逻辑块，检查对应的物理页是否被修改过，若是则强制写回磁盘。 |
|                                                       | file_remove      | **彻底删除**：结合上述功能，将文件截断至 0 字节，清空 FCB 名字标识，并持久化父目录状态。 |

我们可以举个例子：

1.  用户请求写入文件的第 `N` 块（`filebno = N`）。
2.  调用 `file_map_block(f, N, &diskbno, alloc=1)`。
3.  -> `file_map_block` 内部调用 `file_block_walk` 查表。
4.  -> 发现该块在表中为 `0`，于是调用 `alloc_block()`。
5.  -> `alloc_block` 遍历位图，找到空闲物理块 `X`，并调用 `map_block(X)` 为其分配虚拟内存映射。
6.  -> `file_map_block` 将 `X` 填入指针槽位，建立映射关系，并将 `X` 返回。
7.  系统得到物理块号 `X`，通过 `disk_addr(X)` 拿到虚拟地址，向其中写入用户数据。
8.  最后修改硬件标志位，这页数据会在适当的时机由 `unmap_block` 或 `fs_sync` 通过 `write_block` 刷入真实磁盘[^4]

## 文件描述符与文件系统服务

文件系统自身基本上完善了，用户进程现在可向文件服务进程发送需求。

[ascii图片]

user会向fs发送请求，相应的，fs进程返回一些错误值。有时，fs向user返回一些值或者页面供user使用。

### Open与File结构体

用户进程发送什么请求？我们可以联想C语言读写的过程：

```c
    fd = open("/test.txt", O_RDWR | O_CREAT, 0644);
    if (fd < 0) {
        perror("open failed");
        return 1;
    }
```

也就是说，我们需要**指定路径**，**指定模式**。这些信息存储在

```c
struct Open {
    struct File* o_file,
    u_int o_fileid;
    int o_mode;
    struct Filefd* o_ff;
};

...
#define MAXOPEN 1024
struct Open opentab[MAXOPEN]
```

中

1. `o_file`存储了打开的FCB
2. `o_fileid`存储了打开的`id`，我们将会从1024个`id`中分配一个打开的文件，同时也正是`opentab`中的索引
3. `o_mode`记录了打开模式
4. `o_ff`指示`Filefd`结构体，`0x6000000`上4MB的1024页中每一个页都有一个`Filefd`结构体，可由`Open`结构体与用户进程访问，而`Open`结构体不暴露给用户

之所以叫做`Open`，就是文件系统可以利用这个结构体轻松打开这个文件。其顶层`o_*`字段都是用于打开操作的字段。

特别地，1024个`Open`结构体和`Fileid`是**一一对应**，**线性映射**的关系。

```c
// fiel descriptor and file
struct Filefd {
	struct Fd f_fd;
    u_int f_fileid;
    struct File f_file;
}
```

```c
// file descriptor
struct Fd {
	u_int fd_dev_id; 
	u_int fd_offset;
	u_int fd_omode;
};
```

先看`Fd`结构体，他被称为文件描述符，其中

1. `fd_dev_id`是访问的设备符，文件都是`f`
2. `fd_offset`是访问的指针偏移量，例如目前指向第 `i`  个字符
3. `fd_omode`是打开的方式

此外，`Filefd`中其余字段分别是

1. `f_fileid`和原本的`Open`中`fileid`一致
2. `f_file`**不是指针**，存储了FCB的副本

SuperKamonto说`Filefd`的前三个字段是`fd_dev_id`...这三个，应该是搞错了。

### 文件系统

现在可以进入用户的文件系统程序了。我们的入口大概在`serv.c`中的`main`函数。

`main`通过三个函数进行初始化：

- `serve_init`
- `fs_init`
- `serve`

**`serve_init`**：这个函数遍历所有的`opentab`给所有的`o_ff`分配地址`0x60000000+offset`

**`fs_init`**：这个函数又调用三个函数

- `read_super`
- `check_write_block`
- `read_bitmap`

**`read_super`**：直接`read_block`把超级块读进来，其中把`va`赋值给`struct Super* super`。

```c
// Overview:
//  Read and validate the file system super-block.
//
// Post-condition:
//  If error occurred during read super block or validate failed, panic.
void read_super(void) {
	int r;
	void *blk;

	// Step 1: read super block.
	if ((r = read_block(1, &blk, 0)) < 0) {
		user_panic("cannot read superblock: %d", r);
	}

	super = blk;

	// Step 2: Check fs magic nunber.
	if (super->s_magic != FS_MAGIC) {
		user_panic("bad file system magic number %x %x", super->s_magic, FS_MAGIC);
	}

	// Step 3: validate disk size.
	if (super->s_nblocks > DISKMAX / BLOCK_SIZE) {
		user_panic("file system is too large");
	}

	debugf("superblock is good\n");
}
```



**`read_bitmap`**：初始化位图。首先将所有块全部调用`read_block`，确定为位图地址为第二块开始，并第一二块为非空闲

```c
// Overview:
//  Read and validate the file system bitmap.
//
// Hint:
//  Read all the bitmap blocks into memory.
//  Set the 'bitmap' to point to the first bitmap block.
//  For each block i, user_assert(!block_is_free(i))) to check that they're all marked as in use.
void read_bitmap(void) {
	u_int i;
	void *blk;

	// Step 1: Calculate the number of the bitmap blocks, and read them into memory.
	u_int nbitmap = (super->s_nblocks + BLOCK_SIZE_BIT - 1) / BLOCK_SIZE_BIT;
	for (i = 0; i < nbitmap; i++) {
		read_block(i + 2, &blk, 0);
	}

	bitmap = disk_addr(2);

	// Step 2: Make sure the reserved and root blocks are marked in-use.
	// Hint: use `block_is_free`
	user_assert(!block_is_free(0));
	user_assert(!block_is_free(1));

	// Step 3: Make sure all bitmap blocks are marked in-use.
	for (i = 0; i < nbitmap; i++) {
		user_assert(!block_is_free(i + 2));
	}

	debugf("read_bitmap is good\n");
}
```

**`check_write_block`**：用于测试的函数，没有任何用

**`serve`**：用户与文件服务进程通信必然使用IPC，因此文件服务必须不停循环。`serve`函数将自己设置为一个`for(;;)`循环，并且

1. 接收请求
   - **`req`**：返回的请求代码（请求类型）
   - **`whom`**：发送请求的进程ID
   - **`REQVA`**：预定义的固定虚拟地址，用于映射客户端的参数页
   - **`perm`**：接收到的页的权限位
2. 验证参数位`perm`，如果客户没有提供参数页，那么直接跳过
3. 验证请求码，确保请求代码在合法范围
4. 从`serve_table[]`调用具体的处理函数，并处理
5. 清理参数页，失败则直接`panic`

```c
void serve(void) {
	u_int req, whom, perm;
	void (*func)(u_int, u_int);

	for (;;) {
		perm = 0;

		req = ipc_recv(&whom, (void *)REQVA, &perm);

		// All requests must contain an argument page
		if (!(perm & PTE_V)) {
			debugf("Invalid request from %08x: no argument page\n", whom);
			continue; // just leave it hanging, waiting for the next request.
		}

		// The request number must be valid.
		if (req < 0 || req >= MAX_FSREQNO) {
			debugf("Invalid request code %d from %08x\n", req, whom);
			panic_on(syscall_mem_unmap(0, (void *)REQVA));
			continue;
		}

		// Select the serve function and call it.
		func = serve_table[req];
		func(whom, REQVA);

		// Unmap the argument page.
		panic_on(syscall_mem_unmap(0, (void *)REQVA));
	}
}
```

#### FS通信

在传统的宏内核中，文件系统存在于内核态，用户进程通过系统调用直接陷入内核，由内核执行文件查找、读写，然后返回用户态。

但在 MOS 中，文件系统（fs_serv）是一个运行在用户态的普通进程（通常是系统启动后创建的第二个进程，即 `envs[1]`）。

当另一个普通的用户进程想要修改文件大小时，它**无法**直接访问文件系统进程地址空间中的 1GB 块缓存，也无法直接调用上一节我们讲到的 `file_set_size` 等函数。

用户进程必须将请求打包成消息，通过内核的 IPC 机制发送给文件系统服务进程，等待对方处理完毕后再接收返回结果。为了高效地传递复杂的请求参数（如文件路径、打开模式等），MOS 设计了以下机制：

1. **全局通信页 `fsipcbuf`**：
   定义为一个 PAGE_SIZE（4KB）大小的字节数组，且在内存中页对齐。这不仅是一片缓冲区，更是一页完整的物理内存。在调用 ipc_send 时，内核不仅会传递一个整数作为请求类型，还会**将这一整页内存共享映射到文件系统服务进程的地址空间中**。
2. **结构体类型强转**：
   正如你注意到的，`fsipcbuf` 是一片无差别的内存。针对不同的请求类型，我们在 `user/include/fsreq.h` 中定义了对应的结构体。利用 C 语言的指针强转，我们可以按需解释这 4KB 内存的前几十个字节，将参数序列化

举例，`fsipc_set_size`中我们要调整文件的`size`：

```c
int fsipc_set_size(u_int fileid, u_int size) {
	struct Fsreq_set_size *req;

	req = (struct Fsreq_set_size *)fsipcbuf;
	req->req_fileid = fileid;
	req->req_size = size;
	return fsipc(FSREQ_SET_SIZE, req, 0, 0);
}
```

传入一个文件的`id`与相应的参数，通过操作`fsipcbuf`，进行最后的操作。

`fsipc_set_size`最后调用`fsipc`，所有的 `fsipc_*` 包装函数最终都会调用底层的 `fsipc` 静态函数：

```c
static int fsipc(u_int type, void *fsreq, void *dstva, u_int *perm) {
    u_int whom;
    // envs[1].env_id 固定为文件系统服务进程。
    // type: 命令字
    // fsreq: 携带参数的共享页（通常就是 fsipcbuf）。
    // PTE_D: 允许服务端对该共享页进行写操作，服务端可以通过修改该页返回数据。
    ipc_send(envs[1].env_id, type, fsreq, PTE_D);

    // 阻塞等待响应：
    // dstva: 如果服务端需要返回一个完整的数据页（例如读取文件块），它会被映射到当前进程的 dstva 虚拟地址处。如果为 0，表示不需要接收数据页。
    return ipc_recv(&whom, dstva, perm);
}
```

`serve_table`存储了所有请求：

```c
void *serve_table[MAX_FSREQNO] = {
    [FSREQ_OPEN] = serve_open,	 
    [FSREQ_MAP] = serve_map,     
    [FSREQ_SET_SIZE] = serve_set_size,
    [FSREQ_CLOSE] = serve_close, 
    [FSREQ_DIRTY] = serve_dirty, 
    [FSREQ_REMOVE] = serve_remove,
    [FSREQ_SYNC] = serve_sync,
};

```

因此，最后我们将会跳转到**`serve_set_size()`**：

```c
void serve_set_size(u_int envid, struct Fsreq_set_size *rq) {
	struct Open *pOpen;
	int r;
	if ((r = open_lookup(envid, rq->req_fileid, &pOpen)) < 0) {
		ipc_send(envid, r, 0, 0);
		return;
	}

	if ((r = file_set_size(pOpen->o_file, rq->req_size)) < 0) {
		ipc_send(envid, r, 0, 0);
		return;
	}

	ipc_send(envid, 0, 0, 0);
}
```

每个`serve`函数几乎都需要先声明一个`pOpen`，然后进行各自的处理。

`serve_set_size`会调用`open_lookup`函数。

```c
int open_lookup(u_int envid, u_int fileid, struct Open **po) {
	struct Open *o;

	if (fileid >= MAXOPEN) {
		return -E_INVAL;
	}

	o = &opentab[fileid];

	if (pageref(o->o_ff) <= 1) {
		return -E_INVAL;
	}

	*po = o;
	return 0;
}
```

奇怪地，这里的`envid`参数没有任何用！真是奇异搞笑。

接着，如果`fileid`大于`MAXOPEN`，或`pageref(o->o_ff)<=1`（说明fs和usr没有共享这个文件描述符），返回`-E_INVAL`。

将`*po`赋为第`fileid`个`opentab`条目然后返回。

#### 详解各个`fsipc`函数

**`fsipc_open`**：

```c
// Overview:
//  Send file-open request to the file server. Includes path and
//  omode in request, sets *fileid and *size from reply.
//
// Returns:
//  0 on success,
//  < 0 on failure.
int fsipc_open(const char *path, u_int omode, struct Fd *fd) {
	u_int perm;
	struct Fsreq_open *req;

	req = (struct Fsreq_open *)fsipcbuf;

	// The path is too long.
	if (strlen(path) >= MAXPATHLEN) {
		return -E_BAD_PATH;
	}

	strcpy((char *)req->req_path, path);
	req->req_omode = omode;
	return fsipc(FSREQ_OPEN, req, fd, &perm);
}
```

几乎所有`fsipc`都会第一步转换全局缓冲区为自己所需要的指针，然后检查输入并确定好自己的`req`结构体。接着将自己的`req`块打包发送给`fsipc`，这是底层C常用操作。

**`serve_open`**：

```c
void serve_open(u_int envid, struct Fsreq_open *rq) {
	struct File *f;
	struct Filefd *ff;
	int r;
	struct Open *o;

	// Find a file id.
	if ((r = open_alloc(&o)) < 0) {
		ipc_send(envid, r, 0, 0);
		return;
	}

	if ((rq->req_omode & O_CREAT) && (r = file_create(rq->req_path, &f)) < 0 &&
	    r != -E_FILE_EXISTS) {
		ipc_send(envid, r, 0, 0);
		return;
	}

	// Open the file.
	if ((r = file_open(rq->req_path, &f)) < 0) {
		ipc_send(envid, r, 0, 0);
		return;
	}

	// Save the file pointer.
	o->o_file = f;

	// If mode include O_TRUNC, set the file size to 0
	if (rq->req_omode & O_TRUNC) {
		if ((r = file_set_size(f, 0)) < 0) {
			ipc_send(envid, r, 0, 0);
			return;
		}
	}

	// Fill out the Filefd structure
	ff = (struct Filefd *)o->o_ff;
	ff->f_file = *f;
	ff->f_fileid = o->o_fileid;
	o->o_mode = rq->req_omode;
	ff->f_fd.fd_omode = o->o_mode;
	ff->f_fd.fd_dev_id = devfile.dev_id;
	ipc_send(envid, 0, o->o_ff, PTE_D | PTE_LIBRARY);
}
```

`serve_open`非常长，不过我们可以先看点乐子——其第一个调用的`open_alloc`函数

1. **`open_alloc`**：负责分配一个`open`结构体，但是SuperKamonto将其称为最鬼畜的函数。

找出所有`open`结构体对应的`filefd`结构体（占用一个页面）的`pp_ref`。

如果等于0：说明根本没有被映射过，这个虚拟地址应当分配一个新的物理页面；

如果等于1：只有FS拥有这个，说明用户进程没有使用他；

大于等于2：说明这个页是被用户使用的；

```c
/*
 * Overview:
 *  Allocate an open file.
 * Parameters:
 *  o: the pointer to the allocated open descriptor.
 * Return:
 * 0 on success, - E_MAX_OPEN on error
 */
int open_alloc(struct Open **o) {
	int i, r;

	// Find an available open-file table entry
	for (i = 0; i < MAXOPEN; i++) {
		switch (pageref(opentab[i].o_ff)) {
		case 0:
			if ((r = syscall_mem_alloc(0, opentab[i].o_ff, PTE_D | PTE_LIBRARY)) < 0) {
				return r;
			}
		case 1:
			*o = &opentab[i];
			memset((void *)opentab[i].o_ff, 0, BLOCK_SIZE);
			return (*o)->o_fileid;
		}
	}

	return -E_MAX_OPEN;
}
```

如果发现是空闲，就将其分配到`open`。

问：为什么这里要添加`PTE_LIBRARY`？这个在lab5并不常见，甚至指导书几乎没逼几句！

答：我们考虑一个小情景，`env1`和`env2`共享页面`p`，此时`env1`调用`fork`产生了一个`env1_child`子进程，因此`env1`和`env1_child`的页表项中，`p`都将会是`PTE_COW`；一旦触发写时复制，那`env1`的页面就变成复制的新页面了！不和`env2`共享了！这会导致严重的问题。

此外，`env1`与`env2`同时读一个共享的文件，一个每次往后读5个字节，一个10字节，很快就会把offset指针弄乱！

因此我们需要`PTE_LIBRARY`为后续解决共享与并发冲突来提供解决方案。

问：`case 0`为什么不返回？

答：奇异搞笑地是——编写者故意精心让它能够分配完之后继续执行`case 1`，这是严重违反编程规范的，不是BUG，但是能跑。

好了，回到`serve_open`，接下来无论出了什么错，都要在`return`前多向原进程返回一个通信。

2. 试图创建文件

```c
//user/include/lib.h
// File open modes
#define O_RDONLY 0x0000	 /* open for reading only */
#define O_WRONLY 0x0001	 /* open for writing only */
#define O_RDWR 0x0002	 /* open for reading and writing */
#define O_ACCMODE 0x0003 /* mask for above modes */
#define O_CREAT 0x0100	 /* create if nonexistent */
#define O_TRUNC 0x0200	 /* truncate to zero length */

// Unimplemented open modes
#define O_EXCL 0x0400  /* error if already exists */
#define O_MKDIR 0x0800 /* create directory, not regular file */

```

**虽然有点奇怪，但是`RDONLY`是`0x0000`，这个是照抄JOS的，不要用`perm & 0x0000`！**必须使用`O_ACCMODE`掩码进行`(perm & O_RDONLY) == O_RDONLY`判断。

3. 按要求截取文件
4. 填写`ff`的各种字段

---

**`fsipc_map`**：将`fileid`和`offset`传入，最后检查`perm`

```c
// Overview:
//  Make a map-block request to the file server. We send the fileid and
//  the (byte) offset of the desired block in the file, and the server sends
//  us back a mapping for a page containing that block.
//
// Returns:
//  0 on success,
//  < 0 on failure.
int fsipc_map(u_int fileid, u_int offset, void *dstva) {
	int r;
	u_int perm;
	struct Fsreq_map *req;

	req = (struct Fsreq_map *)fsipcbuf;
	req->req_fileid = fileid;
	req->req_offset = offset;

	if ((r = fsipc(FSREQ_MAP, req, dstva, &perm)) < 0) {
		return r;
	}

	if ((perm & ~(PTE_D | PTE_LIBRARY)) != (PTE_V)) {
		user_panic("fsipc_map: unexpected permissions %08x for dstva %08x", perm, dstva);
	}

	return 0;
}
```

在`serve_map`端也非常简单

```c
void serve_map(u_int envid, struct Fsreq_map *rq) {
	struct Open *pOpen;
	u_int filebno;
	void *blk;
	int r;

	if ((r = open_lookup(envid, rq->req_fileid, &pOpen)) < 0) {
		ipc_send(envid, r, 0, 0);
		return;
	}

	filebno = rq->req_offset / BLOCK_SIZE;

	if ((r = file_get_block(pOpen->o_file, filebno, &blk)) < 0) {
		ipc_send(envid, r, 0, 0);
		return;
	}

	ipc_send(envid, 0, blk, PTE_D | PTE_LIBRARY);
}
```

---

**`fsipc_close`**：关闭一个文件

```c
// Overview:
//  Make a file-close request to the file server. After this the fileid is invalid.
int fsipc_close(u_int fileid) {
	struct Fsreq_close *req;

	req = (struct Fsreq_close *)fsipcbuf;
	req->req_fileid = fileid;
	return fsipc(FSREQ_CLOSE, req, 0, 0);
}
```

将文件id传入即可，然后在`serev`端调用`open_lookup`和`file_close`。

---

**`fsipc_dirty`**：与之相似的，是`dirty`函数

```c
// Overview:
//  Ask the file server to mark a particular file block dirty.
int fsipc_dirty(u_int fileid, u_int offset) {
	struct Fsreq_dirty *req;

	req = (struct Fsreq_dirty *)fsipcbuf;
	req->req_fileid = fileid;
	req->req_offset = offset;
	return fsipc(FSREQ_DIRTY, req, 0, 0);
}
```

传入`fileid`与`offset`，最后会调用`open_lookup`和`file_dirty`函数。

---

**`fsipc_remove`**：

```c
// Overview:
//  Ask the file server to delete a file, given its path.
int fsipc_remove(const char *path) {
	// Step 1: Check the length of 'path' using 'strlen'.
	// If the length of path is 0 or larger than 'MAXPATHLEN', return -E_BAD_PATH.

	if (strlen(path) == 0 || strlen(path) >= MAXPATHLEN) {
		return -E_BAD_PATH;
	}

	// Step 2: Use 'fsipcbuf' as a 'struct Fsreq_remove'.
	struct Fsreq_remove *req = (struct Fsreq_remove *)fsipcbuf;

	// Step 3: Copy 'path' into the path in 'req' using 'strcpy'.
	strcpy((char*)req->req_path, path);

	// Step 4: Send request to the server using 'fsipc'.
	return fsipc(FSREQ_REMOVE, req, 0, 0);

}s
```

特别注意这里需要调用`strcpy(char*)`，转为`char`字符串。

`serve`端直接调用`file_remove`

---

最后一个**`fsipc_sync`**：

```c
// Overview:
//  Ask the file server to update the disk by writing any dirty
//  blocks in the buffer cache.
int fsipc_sync(void) {
	return fsipc(FSREQ_SYNC, fsipcbuf, 0, 0);
}
```

`serve`端直接调用`file_sync`。

### 顶层函数

我们终于进入了用户态调用的顶层函数，这一层的目标是为用户进程提供符合 POSIX 标准的文件操作接口，如 `open、read、write、close`。在这个阶段，底层的 IPC 通信机制、物理磁盘寻址和共享内存映射都被封装了起来。在这一层，我们不再直接处理 IPC 消息，而是操作**文件描述符 (File Descriptor)**。

在宏内核中，文件描述符表存在于内核的进程控制块（PCB）中。但在 MOS 的微内核设计中，文件描述符表存在于**用户进程自己的虚拟地址空间**内。

系统在进程的虚拟内存中划定了一块区域 `FDTABLE`，专门用来存放描述符。每一个打开的文件占用一整页（4KB）。用户有32个，FS有1024个。

- `fd_alloc(struct Fd **fd_store)`：遍历这块虚拟空间，找到第一个尚未被映射的页，将其首地址返回给` fd_store`。
- `fd2num(struct Fd *fd)`：将这个指针地址减去基址 `FDTABLE`，再除以页大小（`PAGE_SIZE`），就能得到一个从 0 开始的整数，这就是返回给用户的整数描述符。

为什么 read 函数既能读磁盘文件，又能读控制台输入，还能读管道？MOS 借鉴了面向对象编程中“多态”的思想。在 `struct Fd` 的头部有一个字段 `fd_dev_id`。系统维护了一个设备驱动注册表（`devtab`）。通过调用 `dev_lookup(dev_id, &dev)`，可以获取到一个设备操作函数集 `struct Dev`，它包含了特定设备专属的 `dev_read` 和 `dev_write` 函数指针。这样，顶层的 `read` 函数就成了一个分配器。

同时，回顾一下：

| 结构体名称        | 存放进程 | 存放位置                       | 引用/关联关系                         |
| ----------------- | -------- | ------------------------------ | ------------------------------------- |
| **struct File**   | FS 进程  | DISKMAP 块缓存内               | 被 `opentab[i].o_file` 指向           |
| **struct Fd**     | 用户进程 | FDTABLE 页面首部               | 它是 `struct Filefd` 的开头部分       |
| **struct Filefd** | 用户进程 | FDTABLE 页面完整视图           | 内部包含 `fileid` 和 `File` 副本      |
| **OpenFile**      | FS 进程  | 全局数组 `opentab`             | 建立`fileid` 与物理 `File` 的联系     |
| **fileid**        | 两个进程 | `Filefd` 内部 / `opentab` 索引 | 用户通过它在 IPC 请求中定位服务端资源 |

```text
地址空间划分      用户进程 (User Process)               文件系统进程 (FS Process)
                +----------------------------+        +----------------------------+
0x80000000 ---- |      ULIM (内核边界)        |        |      ULIM (内核边界)        |
(ULIM)          +----------------------------+        +----------------------------+
                |   User VPT (页表只读映射)    |        |   User VPT (页表只读映射)    |
0x7F400000 ---- +----------------------------+ (USTACKTOP) -----------------------+
                |      用户栈 (Stack)         |        |     FS 服务进程栈 (Stack)    |
                |            |               |        |            |               |
                |            v               |        |            v               |
                +----------------------------+        +----------------------------+
                |   fsipcbuf (IPC 共享页)     | <----> |   fsipcbuf (接收缓冲区)     |
                |   (0x7F3FE000 左右)         |        |   (接收用户请求参数)        |
                +----------------------------+        +----------------------------+
                |            ...             |        |   opentab 对应的 Fd 物理页   |
                |      (未分配空间)           |        |   (管理所有用户打开的 Fd)    |
0x70000000 ---- +----------------------------+        +----------------------------+
                |   Fd 页面 n (Filefd n)     | --+    |                            |
                +----------------------------+   |    |                            |
                |            ...             |   |共享|                            |
                +----------------------------+   |映射|                            |
                |   Fd 页面 1 (Filefd 1)     | --+    |  这些物理页在 FS 进程中      |
                +----------------------------+   |    |  通常位于其 Data/Heap 段     |
                |   Fd 页面 0 (Filefd 0)     | --+    |  或专门分配的页面池中        |
0x60000000 ---- +----------------------------+        +----------------------------+
(FDTABLE)       |       用户程序代码与数据     |        |   FS 程序代码与数据 (0x40..)|
                |       (0x00400000 以上)     |        |   包括 opentab 数组等      |
                +----------------------------+        +----------------------------+
```



从`open`开始讲起。

**`open`**：这个函数和C标准库中的`fopen`一致。首先他要分配一个文件描述符`fd`

```c
int fd_alloc(struct Fd **fd) {
	u_int va;
	u_int fdno;

	for (fdno = 0; fdno < MAXFD - 1; fdno++) {
		va = INDEX2FD(fdno);

		if ((vpd[va / PDMAP] & PTE_V) == 0) {
			*fd = (struct Fd *)va;
			return 0;
		}

		if ((vpt[va / PTMAP] & PTE_V) == 0) { // the fd is not used
			*fd = (struct Fd *)va;
			return 0;
		}
	}

	return -E_MAX_OPEN;
}
```

`fd_alloc`先查页表项，检查用户进程的相应文件描述符地址处是否被映射。

open 执行过程可拆解为以下 5 步：

1. **fd_alloc**：在用户进程的 FDTABLE 区域寻找一个未被映射的空闲页，作为新的 Fd 结构。
2. **fsipc_open**：发起 IPC 请求。服务端会在其 opentab 中记录打开实例，并将包含 Filefd 信息的物理页同步映射到用户进程刚刚找好的 fd 页面。
3. **数据区定位**：通过 fd2data 找到该描述符对应的文件内容映射起始地址 va。
4. **内容预映射 (fsipc_map)**：循环遍历文件大小，将文件的每一块（Block）通过 IPC 映射到用户进程的虚拟数据区。*注意：这体现了内存映射文件（mmap）的思想。*
5. **返回句柄**：通过 fd2num 将页面指针转换为用户熟悉的整数 fd。

```c
// Overview:
//  Open a file (or directory).
//
// Returns:
//  the file descriptor on success,
//  the underlying error on failure.
int open(const char *path, int mode) {
	int r;

	// Step 1: Alloc a new 'Fd' using 'fd_alloc' in fd.c.
	// Hint: return the error code if failed.
	struct Fd *fd;
	/* Exercise 5.9: Your code here. (1/5) */
	r = fd_alloc(&fd);
	if (r != 0) return r;

	// Step 2: Prepare the 'fd' using 'fsipc_open' in fsipc.c.
	/* Exercise 5.9: Your code here. (2/5) */

	r = fsipc_open(path, mode, fd);
	if (r != 0) return r;

	// Step 3: Set 'va' to the address of the page where the 'fd''s data is cached, using
	// 'fd2data'. Set 'size' and 'fileid' correctly with the value in 'fd' as a 'Filefd'.
	char *va;
	struct Filefd *ffd;
	u_int size, fileid;
	/* Exercise 5.9: Your code here. (3/5) */
	va = fd2data(fd);
	ffd = (struct Filefd*) fd;
	fileid = ffd->f_fileid;
	size = ffd->f_file.f_size;

	// Step 4: Map the file content using 'fsipc_map'.
	for (int i = 0; i < size; i += PTMAP) {
		/* Exercise 5.9: Your code here. (4/5) */
		r = fsipc_map(fileid, i, va + i);
		if (r != 0) return r;
	}

	// Step 5: Return the number of file descriptor using 'fd2num'.
	/* Exercise 5.9: Your code here. (5/5) */
	return fd2num(fd);
}
```

---

**`read`**：为了让 read(0, buf, n) 既能读文件，也能读串口，MOS 引入了设备抽象层：

| 字段                     | 作用                                                  |
| ------------------------ | ----------------------------------------------------- |
| **dev_id**               | 标识设备类型（如 'f' 代表磁盘文件，'c' 代表控制台）。 |
| **dev_read / dev_write** | 函数指针，指向特定设备的底层实现函数。                |
| **devtab[]**             | 全局设备表，存放了所有支持的设备。                    |

#### read 与 write：通用的分发器

这两个函数定义在 `user/lib/fd.c` 中，是所有 I/O 操作的总入口。

- **逻辑流程**：
  1. **fd_lookup**：根据整数 fdnum 找到对应的描述符页面指针 fd。
  2. **dev_lookup**：根据 fd->fd_dev_id 从设备表中找到对应的 struct Dev。
  3. **权限检查**：检查 fd->fd_omode 是否允许读/写操作。
  4. **调用分发**：执行 dev->dev_read 或 dev->dev_write。
  5. **更新偏移量**：**关键步骤！** 如果读写成功，必须手动增加 fd->fd_offset，以保证下次读写能连续进行。

#### 3. file_read 与 file_write：磁盘文件特有的实现

这两个函数定义在 user/lib/file.c 中，它们被填充进 devfile 结构体，专门处理磁盘文件。

- **file_read**：
  由于文件内容已经通过 open 阶段的 fsipc_map 映射到了 fd2data(fd) 对应的内存中，所以 file_read 的本质就是一次 **memcpy**。它只需要计算好剩余大小，防止越界读即可。
- **file_write**：
  1. 如果写入位置超出了当前文件大小，调用 ftruncate 扩展文件。
  2. 执行 memcpy 将用户 buf 的数据拷贝到内存映射区。
  3. **标记脏页 (fsipc_dirty)**：告知文件系统服务端，这几块数据被改动了，将来需要刷回磁盘。

#### 4. ftruncate：文件大小的动态调整

当用户需要改变文件大小时（显式调用或因写入导致自动扩展），ftruncate 会通过 fsipc_set_size 通知服务端修改元数据，并同步更新用户态的页面映射（增加映射或取消映射）。

最后，让我们看看所有的函数

---

### 第一层：用户顶层 API 层

**位置**：`user/lib/file.c`, `user/lib/fd.c`
**职责**：提供符合 POSIX 标准的接口，用户程序直接调用。这些函数屏蔽了描述符分配、IPC 通信以及设备差异。

*   **`open(path, mode)`**：分配 `Fd` 页面，发起 IPC 打开请求，并建立文件内容的初始映射。
*   **`close(fdnum)`**：关闭描述符，通知服务端释放资源，取消内存映射。
*   **`read(fdnum, buf, n)`**：通用的读分发器，根据设备类型调用底层 `dev_read`。
*   **`write(fdnum, buf, n)`**：通用的写分发器，根据设备类型调用底层 `dev_write`。
*   **`seek(fdnum, offset)`**：修改描述符中的偏移量 `fd_offset`。
*   **`remove(path)`**：删除指定路径的文件。
*   **`stat(path, statbuf)`**：获取文件的元数据（大小、名、类型）。
*   **`ftruncate(fdnum, size)`**：修改已打开文件的大小。
*   **辅助函数**：
    *   `fd_alloc(*fd_store)`：在 `FDTABLE` 虚拟区寻找空闲页。
    *   `fd_lookup(fdnum, *fd_store)`：通过整数索引查找 `Fd` 指针。
    *   `fd2num(fd)` / `num2fd(num)`：实现指针地址与整数句柄的转换。
    *   `fd2data(fd)`：计算该描述符对应的数据映射区起始地址。

---

### 第二层：设备抽象层

**位置**：`user/lib/fd.c`, `user/lib/file.c`
**职责**：实现多态。通过 `struct Dev` 结构体，将通用的 `read/write` 分发到具体的设备实现。

*   **`dev_lookup(dev_id, **dev)`**：根据 ID（如 'f'）从 `devtab` 查找驱动程序。
*   **磁盘文件驱动 (`devfile`) 成员函数**：
    *   `file_read`：通过 `memcpy` 从内存映射区读取数据。
    *   `file_write`：拷贝数据到映射区并调用 `fsipc_dirty`。
    *   `file_close`：取消映射并通知服务端。
    *   `file_stat`：从 `Filefd` 副本中提取元数据。

---

### 第三层：用户态 IPC 客户端存根

**位置**：`user/lib/fsipc.c`
**职责**：将请求参数打包进 `fsipcbuf` 共享页，通过 IPC 发送给文件系统服务进程（`fs_serv`）。

*   **`fsipc(type, fsreq, dstva, *perm)`**：**核心底层函数**。负责 `ipc_send` 请求并 `ipc_recv` 结果。
*   **具体请求封装**：
    *   `fsipc_open`, `fsipc_map`, `fsipc_set_size`, `fsipc_close`, `fsipc_dirty`, `fsipc_remove`, `fsipc_sync`。

---

### 第四层：文件系统服务端分发层 (FS Server Dispatcher)

**位置**：`fs/serv.c`
**职责**：文件系统进程的主循环。接收来自各用户进程的 IPC，并分发给对应的服务端处理函数。

*   **`main()`**：入口，初始化服务并启动 `serve()`。
*   **`serve()`**：无限循环，监听 IPC 请求。
*   **服务端处理函数 (`serve_*`)**：
    *   `serve_open`, `serve_map`, `serve_set_size`, `serve_close`, `serve_dirty`, `serve_remove`, `serve_sync`。
*   **辅助函数**：
    *   `serve_init()`：初始化服务端全局打开文件表 `opentab`。

---

### 第五层：服务端文件结构逻辑层 (FS Logic Layer)

**位置**：`fs/fs.c`
**职责**：实现文件系统的核心逻辑，如路径解析、索引块遍历、FCB 修改等。

*   **路径与目录处理**：
    *   `walk_path(path, **pdir, **pfile, *lastelem)`：**核心路径解析引擎**。
    *   `dir_lookup(dir, name, **file)`：在目录块中检索文件名。
    *   `dir_alloc_file(dir, **file)`：在目录下分配一个新的 `File` 结构空间。
*   **文件操作**：
    *   `file_open`, `file_create`, `file_remove`。
    *   `file_set_size`, `file_truncate`：调整文件大小并回收/分配物理块。
    *   `file_flush(f)`：将文件的脏数据块同步回磁盘。
*   **物理寻址 (Index Mapping)**：
    *   `file_get_block(f, filebno, **blk)`：获取文件逻辑块在内存中的地址。
    *   `file_map_block(f, filebno, *diskbno, alloc)`：实现逻辑块到物理磁盘块的转换。
    *   `file_block_walk(f, filebno, ***ppdiskbno, alloc)`：遍历直接/间接指针槽位。
    *   `file_clear_block(f, filebno)`：解除逻辑块与物理块的映射并释放物理块。

---

### 第六层：物理块缓存与位图管理层

**位置**：`fs/fs.c`
**职责**：管理磁盘物理块的分配与回收，维护虚拟内存到磁盘块的“块缓存”映射。

*   **块操作**：
    *   `read_block(blockno, **blk, *isnew)`：读取磁盘块到缓存。
    *   `write_block(blockno)`：将缓存块同步回物理磁盘。
    *   `map_block(blockno)` / `unmap_block(blockno)`：管理物理页与缓存虚拟地址的映射。
    *   `alloc_block()` / `free_block(blockno)`：通过位图申请/释放磁盘块。
*   **初始化与状态检查**：
    *   `fs_init()`：读取超级块和位图，初始化文件系统环境。
    *   `read_super()` / `read_bitmap()`：加载核心元数据。
    *   辅助函数：`disk_addr` (计算缓存 VA)、`block_is_free` (查位图)、`block_is_mapped` (查页表)、`block_is_dirty` (查脏位)。

---

### 第七层：底层调用层

**位置**：`fs/ide.c`, `kern/syscall_all.c`
**职责**：直接与硬件寄存器（MMIO）交互。

*   **`ide_read(diskno, secno, dst, nsecs)`**：用户态磁盘驱动，操作 IDE 寄存器读扇区。
*   **`ide_write(diskno, secno, src, nsecs)`**：用户态磁盘驱动，操作 IDE 寄存器写扇区。
*   **内核系统调用**：
    *   `sys_read_dev(va, pa, len)`：内核代表用户态读硬件寄存器。
    *   `sys_write_dev(va, pa, len)`：内核代表用户态写硬件寄存器。
*   **辅助函数**：
    *   `wait_ide_ready()`：轮询 IDE 状态寄存器直至就绪。

[^1]: `f_indirect` 本身是一个磁盘块号，该块中存放的不是文件数据，而是一**组指向数据块的指针**（每个指针 4 字节）。这个间接块可以容纳 `NINDIRECT = BLOCK_SIZE / 4` 个指针，每个指针指向一个**数据块**。
[^2]: 有趣的是，几年之前的错误代码从不调出也不调用磁盘，关机重启磁盘内容就会全部丢失，但是qemu毕竟不是真实设备，关机后就销毁了所有虚拟磁盘，导致这个bug一直流传
[^3]:  `PTE_D`和`PTE_DIRTY`是两个完全不同的标志位，前者表示页面为脏，后者表示磁盘块为脏。严谨地说，`PTE_D`意味着内存缓存应当回写，`PTE_DIRTY`意味着内存上的磁盘缓存应当回写。
[^4]: 希望它真的会写回Lab 5 Exam

