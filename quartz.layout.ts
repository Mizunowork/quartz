import { PageLayout, SharedLayout } from "./quartz/cfg" 
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {  
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({ 
    links: {
      RSS: "https://enneaaa.netlify.app/feed.xml",   
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
    Component.DesktopOnly(Component.RecentNotes({
      title: "最近更新",
      showTags: false,
      limit: 10,
      linkToMore: "recent",
    })),
    // Component.Explorer(),     
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.DesktopOnly(Component.Graph()),       
  ],
  afterBody: [
    Component.Backlinks(), 
    Component.MobileOnly(Component.RecentNotes({
      title: "最近更新",
      showTags: false,
      limit: 10,
      linkToMore: "recent",
    })),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {    
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta()], 
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
      limit: 10,
      linkToMore: "recent",
    })),
    // Component.Explorer(),    
  ],
  right: [
    Component.DesktopOnly(Component.Graph()),
  ],
  afterBody: [
    Component.Backlinks(), 
    Component.MobileOnly(Component.RecentNotes({
      title: "最近更新",
      showTags: false,
      limit: 10,
      linkToMore: "recent",
    })),
  ],
}
