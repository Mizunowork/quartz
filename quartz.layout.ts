import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Comments({
      provider: 'giscus',
      options: {
        // from data-repo
        repo: 'ArenaDruid/quartz',
        // from data-repo-id
        repoId: 'R_kgDOKZeA4A',
        // from data-category
        category: 'giscus',
        // from data-category-id
        categoryId: 'DIC_kwDOKZeA4M4CmPc2',
      }
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/ArenaDruid",
      "哔哩哔哩": "https://space.bilibili.com/37095972",
      "豆瓣": "https://www.douban.com/people/178019815",
      "电子邮件：me@arenadruid.top": "mailto:me@arenadruid.top"
      //"本作品已获得CC BY 4.0许可": "https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    //Component.DesktopOnly(Component.Explorer()),
    Component.DesktopOnly(Component.RecentNotes()),
    //Component.RecentNotes(),
  ],
  right: [
    //Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    //Component.RecentNotes(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    //Component.DesktopOnly(Component.Explorer()),
    Component.DesktopOnly(Component.RecentNotes()),
  ],
  right: [],
}
