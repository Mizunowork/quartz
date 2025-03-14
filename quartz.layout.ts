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
    Component.RecentNotes({
  title: "最近更新",
  showTags: false,
  limit: 10,
  filter: (f) => {
    if (f.filePath?.endsWith("index.md")) {
      return false
    }
    return true
  },
  sort: (f1, f2) => {
    if (f1.dates && f2.dates) {
      if (Math.abs(f2.dates.modified.getDay() - f1.dates.modified.getDay())<=3) {
        return f2.dates.created.getTime() - f1.dates.created.getTime()
      }
      return f2.dates.modified.getTime() - f1.dates.modified.getTime()
    } else if (f1.dates && !f2.dates) {
      return -1
    }
    return 1
  }
}),
    // Component.Explorer(),     
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
    Component.RecentNotes({
  title: "最近更新",
  showTags: false,
  limit: 10,
  filter: (f) => {
    if (f.filePath?.endsWith("index.md")) {
      return false
    }
    return true
  },
  sort: (f1, f2) => {
    if (f1.dates && f2.dates) {
      if (Math.abs(f2.dates.modified.getDay() - f1.dates.modified.getDay())<=3) {
        return f2.dates.created.getTime() - f1.dates.created.getTime()
      }
      return f2.dates.modified.getTime() - f1.dates.modified.getTime()
    } else if (f1.dates && !f2.dates) {
      return -1
    }
    return 1
  }
}),
    // Component.Explorer(),    
  ],
  right: [],
}
