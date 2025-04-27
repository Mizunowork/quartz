import { FilePath, FullSlug, joinSegments, slugifyFilePath } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import path from "path"
import fs from "fs"
import { glob } from "../../util/glob"
import { Argv } from "../../util/ctx"
import { QuartzConfig } from "../../cfg"
import sharp from "sharp"

// - Sharp doesn't support BMP input out of the box:
//     https://github.com/lovell/sharp/issues/543
// - GIF / GIFV processing can be very slow or ineffective (larger file size when
//   CPU effort is set to a low number); only enable after testing:
//     https://github.com/lovell/sharp/issues/3176
export const imageExtsToOptimize: ReadonlySet<string> = new Set([".png", ".jpg", ".jpeg"])
// Remember to also update sharp to use the right extension.
export const targetOptimizedImageExt = ".webp"

const filesToCopy = async (argv: Argv, cfg: QuartzConfig) => {
  // glob all non MD files in content folder and copy it over
  return await glob("**", argv.directory, ["**/*.md", ...cfg.configuration.ignorePatterns])
}

const copyFile = async (argv: Argv, cfg: QuartzConfig, fp: FilePath) => {
  const src = joinSegments(argv.directory, fp) as FilePath

  const srcExt = path.extname(fp).toLowerCase()
  const doOptimizeImage = cfg.configuration.optimizeImages && imageExtsToOptimize.has(srcExt)

  const name = doOptimizeImage
    ? ((slugifyFilePath(fp, true) + targetOptimizedImageExt) as FullSlug)
    : slugifyFilePath(fp)
  const dest = joinSegments(argv.output, name) as FilePath

  // ensure dir exists
  const dir = path.dirname(dest) as FilePath
  await fs.promises.mkdir(dir, { recursive: true })

  if (doOptimizeImage) {
    await processImage(src, dest)
  } else {
    await fs.promises.copyFile(src, dest)
  }
  return dest
}

async function processImage(src: FilePath, dest: FilePath) {
  const originalFile = await fs.promises.readFile(src)
  await sharp(originalFile, { animated: false })
    .webp({ quality: 90, smartSubsample: true, effort: 6 })
    // .avif({ quality: 90, effort: 9, chromaSubsampling: "4:2:0", bitdepth: 8 })
    .toFile(dest)
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
        }
      }
    },
  }
}
