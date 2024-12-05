import { Root } from "hast"
import { DateTime } from "luxon"
import { GlobalConfiguration } from "../../cfg"
import { escapeHTML } from "../../util/escape"
import { FilePath, FullSlug, SimpleSlug, joinSegments, simplifySlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { toHtml } from "hast-util-to-html"
import { write } from "./helpers"
import { i18n } from "../../i18n"
import DepGraph from "../../depgraph"
import { QuartzPluginData } from "../vfile"

// Describes the content index (.json) that this plugin produces, to be consumed downstream
export type ContentIndex = Map<FullSlug, ContentDetails>
export type ContentDetails = {
  title: string
  links: SimpleSlug[]
  tags: string[]
  content: string
  richContent?: string
}

// The content index fields only used within this plugin and will not be written to the final index
type FullContentIndex = Map<FullSlug, FullContentDetails>
type FullContentDetails = ContentDetails & {
  dates: QuartzPluginData["dates"]
  description: string
}

interface Options {
  enableSiteMap: boolean
  enableRSS: boolean
  rssLimit?: number
  rssFullHtml: boolean
  includeEmptyFiles: boolean
}

const defaultOptions: Options = {
  enableSiteMap: true,
  enableRSS: true,
  rssLimit: 10,
  rssFullHtml: false,
  includeEmptyFiles: true,
}

function generateSiteMap(cfg: GlobalConfiguration, idx: FullContentIndex): string {
  const base = cfg.baseUrl ?? ""
  const createURLEntry = (slug: SimpleSlug, modified?: DateTime): string => {
    // sitemap protocol specifies that lastmod should *not* be time of sitemap generation; see: https://sitemaps.org/protocol.html#lastmoddef
    // so we only include explicitly set modified dates
    return `  <url>
    <loc>https://${joinSegments(base, encodeURI(slug))}</loc>
    ${modified == null ? "" : `<lastmod>${modified.toISO()}</lastmod>`}
  </url>`
  }
  const urls = Array.from(idx)
    .map(([slug, content]) => createURLEntry(simplifySlug(slug), content.dates?.modified))
    .join("")
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`
}

function generateRSSFeed(cfg: GlobalConfiguration, idx: FullContentIndex, limit?: number): string {
  const base = cfg.baseUrl ?? ""
  const buildDate = DateTime.now()

  const createRSSItem = (
    slug: SimpleSlug,
    content: FullContentDetails,
    pubDate?: DateTime,
  ): string => {
    return `<item>
    <title>${escapeHTML(content.title)}</title>
    <link>https://${joinSegments(base, encodeURI(slug))}</link>
    <guid>https://${joinSegments(base, encodeURI(slug))}</guid>
    <description>${content.richContent ?? content.description}</description>
    ${pubDate == null ? "" : `<pubDate>${pubDate.toRFC2822()}</pubDate>`}
  </item>`
  }
  const items = Array.from(idx)
    .map(([slug, content]): [FullSlug, DateTime | undefined, FullContentDetails] => {
      // rss clients use pubDate to determine the order of items, and which items are newly-published
      // so to keep new items at the front, we use the explicitly set published date and fall back
      // to the earliest other date known for the file
      const { published, ...otherDates } = content.dates ?? {}
      const pubDate =
        published ??
        Object.values(otherDates)
          .sort((d1, d2) => d1.toMillis() - d2.toMillis())
          .find((d) => d)
      return [slug, pubDate, content]
    })
    .sort(([, d1, f1], [, d2, f2]) => {
      // sort primarily by date (descending), then break ties with titles
      if (d1 && d2) {
        return d2.toMillis() - d1.toMillis() || f1.title.localeCompare(f2.title)
      } else if (d1 && !d2) {
        return -1
      } else if (!d1 && d2) {
        return 1
      }
      return f1.title.localeCompare(f2.title)
    })
    .slice(0, limit ?? idx.size)
    .map(([slug, pubDate, content]) => createRSSItem(simplifySlug(slug), content, pubDate))
    .join("")

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
      <title>${escapeHTML(cfg.pageTitle)}</title>
      <link>https://${base}</link>
      <description>${!!limit ? i18n(cfg.locale).pages.rss.lastFewNotes({ count: limit }) : i18n(cfg.locale).pages.rss.recentNotes} on ${escapeHTML(
        cfg.pageTitle,
      )}</description>
      <lastBuildDate>${buildDate.toRFC2822()}</lastBuildDate>
      <generator>Quartz -- quartz.jzhao.xyz</generator>
      ${items}
    </channel>
  </rss>`
}

export const ContentIndex: QuartzEmitterPlugin<Partial<Options>> = (opts) => {
  opts = { ...defaultOptions, ...opts }
  return {
    name: "ContentIndex",
    async getDependencyGraph(ctx, content, _resources) {
      const graph = new DepGraph<FilePath>()

      for (const [_tree, file] of content) {
        const sourcePath = file.data.filePath!

        graph.addEdge(
          sourcePath,
          joinSegments(ctx.argv.output, "static/contentIndex.json") as FilePath,
        )
        if (opts?.enableSiteMap) {
          graph.addEdge(sourcePath, joinSegments(ctx.argv.output, "sitemap.xml") as FilePath)
        }
        if (opts?.enableRSS) {
          graph.addEdge(sourcePath, joinSegments(ctx.argv.output, "index.xml") as FilePath)
        }
      }

      return graph
    },
    async emit(ctx, content, _resources) {
      const cfg = ctx.cfg.configuration
      const emitted: FilePath[] = []
      const linkIndex: FullContentIndex = new Map()
      for (const [tree, file] of content) {
        const slug = file.data.slug!
        if (opts?.includeEmptyFiles || (file.data.text && file.data.text !== "")) {
          linkIndex.set(slug, {
            title: file.data.frontmatter?.title!,
            links: file.data.links ?? [],
            tags: file.data.frontmatter?.tags ?? [],
            content: file.data.text ?? "",
            richContent: opts?.rssFullHtml
              ? escapeHTML(toHtml(tree as Root, { allowDangerousHtml: true }))
              : undefined,
            dates: file.data.dates,
            description: file.data.description ?? "",
          })
        }
      }

      if (opts?.enableSiteMap) {
        emitted.push(
          await write({
            ctx,
            content: generateSiteMap(cfg, linkIndex),
            slug: "sitemap" as FullSlug,
            ext: ".xml",
          }),
        )
      }

      if (opts?.enableRSS) {
        emitted.push(
          await write({
            ctx,
            content: generateRSSFeed(cfg, linkIndex, opts.rssLimit),
            slug: "index" as FullSlug,
            ext: ".xml",
          }),
        )
      }

      const fp = joinSegments("static", "contentIndex") as FullSlug
      // explicitly annotate the type of simplifiedIndex to typecheck output file contents
      const simplifiedIndex: ContentIndex = new Map(
        Array.from(linkIndex, ([slug, fullContent]) => {
          // remove description and from content index as nothing downstream
          // actually uses it. we only keep it in the index as we need it
          // for the RSS feed
          const { description, dates, ...content } = fullContent
          return [slug, content]
        }),
      )

      emitted.push(
        await write({
          ctx,
          content: JSON.stringify(Object.fromEntries(simplifiedIndex)),
          slug: fp,
          ext: ".json",
        }),
      )

      return emitted
    },
    getQuartzComponents: () => [],
  }
}
