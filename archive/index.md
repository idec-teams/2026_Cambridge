---
layout: page
title: Archive
permalink: /archive/
article_header: false
---

<div class="archive-landing">
  <header class="archive-hero">
    <h1>Archive</h1>
    <p>This section contains weekly records of our progress.</p>
  </header>

  <ol class="archive-timeline" aria-label="Weekly progress archive">
    {% for week in site.data.archive_weeks %}
      <li class="archive-timeline__item">
        <span class="archive-timeline__marker" aria-hidden="true"></span>
        <article class="archive-week">
          <h2>{{ week.title }}</h2>
          {% if week.content %}
            <div class="archive-week__content">{{ week.content | markdownify }}</div>
          {% else %}
            <div class="archive-week__space" aria-hidden="true"></div>
          {% endif %}
        </article>
      </li>
    {% endfor %}
  </ol>
</div>
