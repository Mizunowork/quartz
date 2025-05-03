import { PluggableList, Plugin, Transformer } from "unified"
import { QuartzTransformerPlugin } from "../types"
import { Element, Root as HtmlRoot } from "hast"
import { visit } from "unist-util-visit"
import { imageExtsToOptimize, previewImageMap, targetOptimizedImageExt } from "../emitters/assets"
import { FullSlug, getFileExtension, isAbsoluteURL, RelativeURL } from "../../util/path"
import { parseSelector } from "hast-util-parse-selector"

export interface Options {}

const defaultOptions: Options = {}

/**
 * File extensions of all supported image format. Files with an extension
 * not on this list will not be recognized as images in wikilinks.
 *
 * @see ObsidianFlavoredMarkdown
 */
export const supportedImageExts: ReadonlySet<string> = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".gifv",
  ".bmp",
  ".svg",
  ".webp",
  ".avif",
])

/**
 * Transformer for the `<img>` HTML tag.
 *
 * Add this plugin after all Markdown parser plugins in quartz.config.
 */
export const Images: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  //@ts-ignore
  const opts = { ...defaultOptions, ...userOpts }

  return {
    name: "Images",
    htmlPlugins: function (ctx) {
      const plugins: PluggableList = []

      if (ctx.cfg.configuration.optimizeImages) {
        plugins.push(OptimizeImages)
      }

      return plugins
    },
  }
}

/**
 * HAST plugin that updates image tags of supported formats to serve
 * optimized images.
 *
 * For example, given `<img src="../../assets/image.png" width="100" data-slug="assets/image.png" />`, it generates:
 *
 * ```html
 * <a href="../../assets/image.webp" class="preview-image-link" data-no-popover="true" data-router-ignore="true">
 *  <img src="../../assets/image-preview.webp" width="100" height="auto" class="preview-image" />
 * </a>
 * ```
 */
const OptimizeImages: Plugin<[], HtmlRoot> = () => {
  const transformer: Transformer<HtmlRoot> = (tree: HtmlRoot) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "img" && typeof node.properties.src === "string") {
        let src = node.properties.src as RelativeURL
        if (isAbsoluteURL(src)) return // Skip External images
        const ext = getFileExtension(src)
        if (!ext || !supportedImageExts.has(ext)) return
        // `data-slug` is set by the OFM markdown transformer.
        // This is the absolute file path compared to `src`, which can be relative.
        const fullSlug = node.properties["dataSlug"] as FullSlug
        if (!fullSlug) return

        const width =
          node.properties.width && node.properties.width !== "auto"
            ? parseInt(node.properties.width as string)
            : undefined
        const height =
          node.properties.height && node.properties.height !== "auto"
            ? parseInt(node.properties.height as string)
            : undefined
        const shouldOptimizeImage = imageExtsToOptimize.has(ext)

        // If applicable, replace image extension with target extension
        src = shouldOptimizeImage
          ? (src.replace(new RegExp(`${ext}$`), targetOptimizedImageExt) as RelativeURL)
          : src
        node.properties.src = src

        // Replace original image source with preview image if custom dimension is defined
        if (width || height) {
          node.properties.src = src.replace(
            new RegExp(`(?:${ext}|${targetOptimizedImageExt})$`),
            `-preview${shouldOptimizeImage ? targetOptimizedImageExt : ext}`,
          )
          const previewFileSlug = fullSlug.replace(
            new RegExp(`${ext}$`),
            `-preview${shouldOptimizeImage ? targetOptimizedImageExt : ext}`,
          ) as FullSlug
          node.properties.className = [
            "image-preview",
            ...((node.properties.className ?? []) as string[]),
          ]

          // Replace image node with a link wrapper
          const wrapper: Element = parseSelector("a.image-link")
          wrapper.properties.href = src
          // No popover preview when hovering over image links
          wrapper.properties["data-no-popover"] = true
          // Disable SPA router click event that always forces link redirection
          // (to make image links compatible with lightbox plugins)
          wrapper.properties["data-router-ignore"] = true
          wrapper.children = [node]
          parent!.children[index!] = wrapper

          // Add preview image info to Assets emitter for image generation
          const destSlug = fullSlug.replace(
            new RegExp(`${ext}$`),
            shouldOptimizeImage ? targetOptimizedImageExt : ext,
          ) as FullSlug
          previewImageMap.set(destSlug, {
            width,
            height,
            resizeOnly: !shouldOptimizeImage,
            slug: previewFileSlug,
          })
        }

        // `data-slug` served its purpose, strip it
        delete node.properties["dataSlug"]
      }
    })
  }

  return transformer
}
