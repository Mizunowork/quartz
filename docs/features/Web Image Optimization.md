---
title: Web Image Optimization
tags:
  - feature/transformer
---

Quartz uses [`sharp`](https://github.com/lovell/sharp) to optimize images for web serving at build time.

When `optimizeImages` in [[configuration#General-Configuration|General Configuration]] is set to `true`:

- JPEG and PNG images will be stripped all metadata and converted to [WebP](https://caniuse.com/webp) format, and associated image links in `<img>` tags, [[wikilinks#embeds|Wikilinks]] and [[CustomOgImages#frontmatter-properties|Custom OG Image]] frontmatter config `socialImage` will be updated with the new file extension.

- A resized preview image will replace every local image that has custom dimensions defined either in its [wikilink](https://help.obsidian.md/syntax#External+images) or `<img>` tag. The original image (optimized or not) will still be assessable as a link on the preview image.

<!-- prettier-ignore-start -->
> [!note]+ Example usage
>
> The following markdown:
>
> ```md
> ![[images/engelbart.jpeg | 200]]<br/>
> _An example optimized preview image of [Douglas Engelbart](https://awards.acm.org/award_winners/engelbart_5078811). Clicking on it opens an originally sized optimized image._
> ```
>
> generates the following HTML:
>
> ![[images/engelbart.jpeg | 200]]<br/>
> _An example optimized preview image of [Douglas Engelbart](https://awards.acm.org/award_winners/engelbart_5078811). Clicking on it opens an originally sized optimized image._
<!-- prettier-ignore-end -->

## Details

See documentation for the [[Images#web-image-optimization|Images]] transformer plugin for more information.
