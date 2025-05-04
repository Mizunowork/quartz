import { FilePath, FullSlug, joinSegments, slugifyFilePath } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import path from "path"
import fs from "fs"
import { glob } from "../../util/glob"
import { Argv } from "../../util/ctx"
import { QuartzConfig } from "../../cfg"
import sharp from "sharp"

/**
 * Supported image extensions for optimization.
 *
 * Note that:
 * - Sharp doesn't support BMP input out of the box:
 *     https://github.com/lovell/sharp/issues/543
 * - GIF / GIFV processing can be very slow or ineffective (larger file size when
 *   CPU effort is set to a low number); only enable after testing:
 *     https://github.com/lovell/sharp/issues/3176
 */
export const imageExtsToOptimize: ReadonlySet<string> = new Set([".png", ".jpg", ".jpeg"])

/**
 * Target optimized image file extension.
 *
 * Remember to also update sharp to use the right extension.
 */
export const targetOptimizedImageExt = ".webp"

// Original image path -> preview image path
export const previewImageMap = new Map<FullSlug, PreviewImageInfo>()

export interface PreviewImageInfo {
  /**
   * Destination file slug for the preview image.
   */
  slug: FullSlug
  /**
   * If true, only resize the image without format conversion.
   */
  resizeOnly: boolean
  /**
   * If set, resize image to the specified width.
   */
  width?: number
  /**
   * If set, resize image to the specified height.
   */
  height?: number
}

const filesToCopy = async (argv: Argv, cfg: QuartzConfig) => {
  // glob all non MD files in content folder and copy it over
  return await glob("**", argv.directory, ["**/*.md", ...cfg.configuration.ignorePatterns])
}

const copyFile = async (argv: Argv, cfg: QuartzConfig, fp: FilePath) => {
  const src = joinSegments(argv.directory, fp) as FilePath

  const srcExt = path.extname(fp).toLowerCase()
  const doOptimizeImage = cfg.configuration.optimizeImages && imageExtsToOptimize.has(srcExt)

  const destSlug = doOptimizeImage
    ? ((slugifyFilePath(fp, true) + targetOptimizedImageExt) as FullSlug)
    : slugifyFilePath(fp)
  const dest = joinSegments(argv.output, destSlug) as FilePath

  // ensure dir exists
  const dir = path.dirname(dest) as FilePath
  await fs.promises.mkdir(dir, { recursive: true })

  if (doOptimizeImage) {
    await processImage(argv, src, dest)
  } else {
    await fs.promises.copyFile(src, dest)
  }

  if (cfg.configuration.optimizeImages && previewImageMap.has(destSlug)) {
    // Also output preview image
    const previewImageInfo = previewImageMap.get(destSlug)!
    const previewDest = joinSegments(argv.output, previewImageInfo.slug) as FilePath

    await processImage(argv, src, previewDest, previewImageInfo)
  }

  return dest
}

async function processImage(
  argv: Argv,
  src: FilePath,
  dest: FilePath,
  previewImageInfo?: PreviewImageInfo,
) {
  const originalFile = await fs.promises.readFile(src)
  let pipeline = sharp(originalFile, { animated: false })

  if (previewImageInfo) {
    pipeline = pipeline.resize(
      // Give preview images a bit more pixels to improve resolution
      previewImageInfo.width ? Math.round(previewImageInfo.width * 1.2) : undefined,
      previewImageInfo.height ? Math.round(previewImageInfo.height * 1.2) : undefined,
      {
        fit: "cover",
        position: "center",
        withoutEnlargement: true, // Don't upscale
        fastShrinkOnLoad: true,
      },
    )
  }

  if (!(previewImageInfo?.resizeOnly ?? false)) {
    // @ts-expect-error TS2353 till https://github.com/lovell/sharp/pull/4387 is merged.
    pipeline = pipeline.webp({ quality: 90, smartSubsample: true, smartDeblock: true, effort: 6 })
    // .avif({ quality: 90, effort: 9, chromaSubsampling: "4:2:0", bitdepth: 8 })
  }

  // Write file
  await pipeline.toFile(
    previewImageInfo ? (joinSegments(argv.output, previewImageInfo.slug) as FilePath) : dest,
  )
}

export const Assets: QuartzEmitterPlugin = () => {
  return {
    name: "Assets",
    async *emit({ argv, cfg }) {
      const fps = await filesToCopy(argv, cfg)
      for (const fp of fps) {
        yield copyFile(argv, cfg, fp)
      }
    },
    async *partialEmit(ctx, _content, _resources, changeEvents) {
      for (const changeEvent of changeEvents) {
        const ext = path.extname(changeEvent.path).toLowerCase()
        if (ext === ".md") continue

        if (changeEvent.type === "add" || changeEvent.type === "change") {
          yield copyFile(ctx.argv, ctx.cfg, changeEvent.path)
        } else if (changeEvent.type === "delete") {
          const doOptimizeImage =
            ctx.cfg.configuration.optimizeImages && imageExtsToOptimize.has(ext)
          const name = doOptimizeImage
            ? ((slugifyFilePath(changeEvent.path, true) + targetOptimizedImageExt) as FullSlug)
            : slugifyFilePath(changeEvent.path)
          const dest = joinSegments(ctx.argv.output, name) as FilePath
          await fs.promises.unlink(dest)

          // Remove preview image if exists
          if (ctx.cfg.configuration.optimizeImages && previewImageMap.has(name)) {
            const previewDest = joinSegments(
              ctx.argv.output,
              previewImageMap.get(name)!.slug,
            ) as FilePath
            await fs.promises.unlink(previewDest)
            previewImageMap.delete(name)
          }
        }
      }
    },
  }
}
