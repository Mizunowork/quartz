---
title: Images
tags:
  - plugin/transformer
---

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

> [!warning]
> Removing this plugin is _not_ recommended. Use [[configuration#General-Configuration|General Configuration]] to turn web image optimization on or off.

This plugin parses and rewrites HTML image tags to support image related features. It's currently associated with the following features:

## Web Image Optimization

See [[Web-Image-Optimization|Web Image Optimization]] for feature introduction.

If an image has custom dimensions set, this plugin registers corresponding preview image spec with the [[Assets]] emitter so that the latter generates an additional preview image that matches the aspect ratio but with a small resolution bump. Note that [[Assets]] never upscales an image, so preview image file sizes are never larger than the originally sized optimized images.

> [!warning]
> If you use image tags with custom dimensions directly in your markdown documents, remember to manually add a `data-slug` property with the [[paths | full slug]] of the image file, otherwise the [[Assets]] emitter won't know which file path to emit the preview image to.
>
> An example supported image tag with custom dimensions:
>
> ```html
> <img href="../../assets/abc.jpg" width="100" data-slug="assets/abc.jpg" />
> ```

Update the [[Assets]] emitter source code if you want to tweak the image format conversion or/and resizing logic with [`sharp`](https://github.com/lovell/sharp). Here are a few things you could do following code comments:

- Make `sharp` generate [WebP images](https://sharp.pixelplumbing.com/api-output/#webp) with lossless or near-lossless compression (may dramatically increase output file sizes).

- Make `sharp` emit [AVIF](https://caniuse.com/avif) images instead, which is considered a mainstream successor to the [WebP](https://caniuse.com/webp) format, has better compression ratio and image feature sets (such as HDR support), but currently has narrower browser support and may be slower in image processing.

- Enable optimization for animated GIF / GIFV images. Note that animated image processing can be very slow, only use it after testing!

The logic to use optimized images in [[CustomOgImages | Custom OG Images]] is separately implemented in the `ogImage` emitter, but is fully transparent to end users.

## Configuration options

This plugin accepts the following configuration options:

- `openLinksInNewTab`: (Dependent on [[Images#web-image-optimization|Web Image Optimization]]) If `true`, clicking on a preview image opens the originally sized optimized image in a new tab. Defaults to `false`.

## API

- Category: Transformer
- Function name: `Plugin.Images()`.
- Source: [`quartz/plugins/transformers/images.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/images.ts).
