---
layout: home
title: 블로그
permalink: /blog/
---
환영합니다! 최신 글은 아래 목록에서 확인하세요
{% for post in site.posts %}
  <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
  <p>{{ post.excerpt }}</p>
{% endfor %}
