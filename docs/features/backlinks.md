---
title: Backlinks
tags:
  - component
---

A backlink for a note is a link from another note to that note. Links in the backlink pane also feature rich [[popover previews]] if you have that feature enabled.

## Customization

- Removing backlinks: delete all usages of `Component.Backlinks()` from `quartz.layout.ts`.
- Hide when empty: use `Component.Backlinks({ hideWhenEmpty: true })` to hide the backlinks component completely when there are no backlinks.
- Component: `quartz/components/Backlinks.tsx`
- Style: `quartz/components/styles/backlinks.scss`
- Script: `quartz/components/scripts/search.inline.ts`
