import { PageLayout, SharedLayout } from "./quartz/cfg" 
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {  
  head: Component.Head(),
  header: [],
  afterBody: [],
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
    Component.DesktopOnly(Component.RecentNotes({ limit: 3, showTags: false })),
    Component.Explorer(),     
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),     
    Component.Backlinks(),     
    Component.Graph(),       
  ], 
  afterBody: [],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {    
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta()], 
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),    
    Component.Search(),  
    Component.Darkmode(),  
    Component.DesktopOnly(Component.RecentNotes({ limit: 3, showTags: false })),
    Component.Explorer(),    
  ],
  right: [],
}
