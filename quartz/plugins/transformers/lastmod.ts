import fs from "fs"
import path from "path"
import { DateTime, DateTimeOptions } from "luxon"
import { Repository } from "@napi-rs/simple-git"
import { QuartzTransformerPlugin } from "../types"
import chalk from "chalk"

export interface Options {
  priority: ("frontmatter" | "git" | "filesystem")[]
}

const defaultOptions: Options = {
  priority: ["frontmatter", "git", "filesystem"],
}

function parseDateString(
  fp: string,
  d?: string | number | unknown,
  opts?: DateTimeOptions,
): DateTime<true> | undefined {
  if (d == null) return
  // handle cases where frontmatter property is a number (e.g. YYYYMMDD or even just YYYY)
  if (typeof d === "number") d = d.toString()
  if (typeof d !== "string") {
    console.log(
      chalk.yellow(`\nWarning: unexpected type (${typeof d}) for date "${d}" in \`${fp}\`.`),
    )
    return
  }

  const dt = [
    // ISO 8601 format, e.g. "2024-09-09T00:00:00[Africa/Algiers]", "2024-09-09T00:00+01:00", "2024-09-09"
    DateTime.fromISO,
    // RFC 2822 (used in email & RSS) format, e.g. "Mon, 09 Sep 2024 00:00:00 +0100"
    DateTime.fromRFC2822,
    // Luxon is stricter about the format of the datetime string than `Date`
    // fallback to `Date` constructor iff Luxon fails to parse datetime
    (s: string, o: DateTimeOptions) => DateTime.fromJSDate(new Date(s), o),
  ]
    .values()
    .map((f) => f(d, opts))
    // find the first valid parse result
    .find((dt) => dt != null && dt.isValid)

  if (dt == null) {
    console.log(
      chalk.yellow(
        `\nWarning: found invalid date "${d}" in \`${fp}\`. Supported formats: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format`,
      ),
    )
    return
  }
  return dt
}

export const CreatedModifiedDate: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  const parseOpts = {
    setZone: true,
  }
  return {
    name: "CreatedModifiedDate",
    markdownPlugins() {
      return [
        () => {
          let repo: Repository | undefined = undefined
          return async (_tree, file) => {
            let created: DateTime | undefined = undefined
            let modified: DateTime | undefined = undefined
            let published: DateTime | undefined = undefined

            const fp = file.data.filePath!
            const fullFp = path.isAbsolute(fp) ? fp : path.posix.join(file.cwd, fp)
            for (const source of opts.priority) {
              if (source === "filesystem") {
                const st = await fs.promises.stat(fullFp)
                // birthtime can be 0 on some filesystems, so default to the earlier of ctime/mtime
                created ||= DateTime.fromMillis(st.birthtimeMs || Math.min(st.ctimeMs, st.mtimeMs))
                modified ||= DateTime.fromMillis(st.mtimeMs)
              } else if (source === "frontmatter" && file.data.frontmatter) {
                created ||= parseDateString(fp, file.data.frontmatter.date, parseOpts)
                modified ||= parseDateString(fp, file.data.frontmatter.lastmod, parseOpts)
                modified ||= parseDateString(fp, file.data.frontmatter.updated, parseOpts)
                modified ||= parseDateString(fp, file.data.frontmatter["last-modified"], parseOpts)
                published ||= parseDateString(fp, file.data.frontmatter.publishDate, parseOpts)
              } else if (source === "git") {
                if (!repo) {
                  // Get a reference to the main git repo.
                  // It's either the same as the workdir,
                  // or 1+ level higher in case of a submodule/subtree setup
                  repo = Repository.discover(file.cwd)
                }

                try {
                  modified ||= DateTime.fromMillis(
                    await repo.getFileLatestModifiedDateAsync(file.data.filePath!),
                  )
                } catch {
                  console.log(
                    chalk.yellow(
                      `\nWarning: ${file.data
                        .filePath!} isn't yet tracked by git, last modification date is not available for this file`,
                    ),
                  )
                }
              }
            }

            file.data.dates = {
              created: created,
              modified: modified,
              published: published,
            }
          }
        },
      ]
    },
  }
}

declare module "vfile" {
  interface DataMap {
    dates: Partial<{
      created: DateTime
      modified: DateTime
      published: DateTime
    }>
  }
}
