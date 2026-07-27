---
layout: archive
title: "CV"
permalink: /cv-json/
author_profile: false
redirect_from:
  - /resume-json
---

{% include base_path %}

<link rel="stylesheet" href="{{ base_path }}/assets/css/cv-style.css">
<style>
  .archive {
    width: 80%;
    margin: 0 auto;
    float: none;
    padding-right: 0;
  }
  
  @media (min-width: 80em) {
    .archive {
      width: 70%;
    }
  }
</style>

{% include cv-template.html %}

{% assign cv_pdf = site.static_files | where: "path", "/files/cv.pdf" | first %}
<div class="cv-download-links">
  {% if cv_pdf %}
    <a href="{{ base_path }}/files/cv.pdf" class="btn btn--primary">Download CV as PDF</a>
  {% endif %}
  <a href="{{ '/cv/' | relative_url }}" class="btn btn--inverse">View Markdown CV</a>
</div>
