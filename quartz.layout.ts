import { PageLayout, SharedLayout } from "./quartz/cfg" 
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {  
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({ 
    links: {
      RSS: "https://enneaa.netlify.app/feed.xml",   
      "Scroll to top ↑": "#",  
    },
  }),
}

// components for pages that display a single page (e.g. a single note)   
export const defaultContentPageLayout: PageLayout = {   
  beforeBody: [
    // Component.Breadcrumbs(), 
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),  
    Component.MobileOnly(Component.Spacer()),  
    Component.Flex({ 
      components: [ 
        {
          Component: Component.Search(),  
          grow: true, 
        },
        { Component: Component.Darkmode() }, 
      ],
    }),
    Component.DesktopOnly(Component.RecentNotes({
      title: "最近更新",
      showTags: false,
      limit: 5,
      linkToMore: "pages",
    })),
    // Component.Explorer(),
  ],
  right: [
    Component.DesktopOnly(Component.TagList()), 
    Component.DesktopOnly(Component.TableOfContents()),
    Component.DesktopOnly(Component.Graph()),
  ],
  afterBody: [
    Component.Backlinks(), 
    Component.Comments({
      provider: 'giscus',
      options: {
        // from data-repo
        repo: 'enneaa/giscus',
        // from data-repo-id
        repoId: 'R_kgDOOHb7aw',
        // from data-category
        category: 'Announcements',
        // from data-category-id
        categoryId: 'DIC_kwDOOHb7a84Cn6os', 
        themeUrl: "https://enneaa.netlify.app/static/giscus",     
        lightTheme: "light",
        darkTheme: "dark",  
        mapping: "title",
        inputPosition: "bottom",
      }
    }),
    Component.MobileOnly(Component.RecentNotes({ 
      title: "最近更新",
      showTags: false,
      limit: 5,
      linkToMore: "pages",
    })),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    // Component.Breadcrumbs(), 
    Component.ArticleTitle(), 
    Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.DesktopOnly(Component.RecentNotes({
      title: "最近更新",
      showTags: false,
      limit: 5,
      linkToMore: "pages",
    })),
    // Component.Explorer(),
  ],
  right: [],
  afterBody: [
    Component.Backlinks(), 
    Component.MobileOnly(Component.RecentNotes({
      title: "最近更新",
      showTags: false,
      limit: 5,
      linkToMore: "pages",
    })),
  ],
}
