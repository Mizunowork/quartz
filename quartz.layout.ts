import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  left: [Component.RecentNotes({
    title: "最近笔记",
    limit: 5,
    showTags: true
  })],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Scroll to top ↑": "#",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = { 
  beforeBody: [
    Component.ArticleTitle(),
    Component.ContentMeta(), 
    Component.TagList(),
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
  ],
  right: [ 
    Component.DesktopOnly(Component.TableOfContents()), 
    Component.Graph(),
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
        themeUrl: "https://enneaaa.netlify.app/static/giscus", 
        lightTheme: "light-theme", 
        darkTheme: "dark-theme",
        inputPosition: "top",
      }
    }),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = { 
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
  ],
  right: [],
  afterBody: [],
}
