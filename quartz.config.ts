import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "🌲是話說",  
    pageTitleSuffix: "",  
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "zh-CN", 
    baseUrl: "enneaaa.netlify.app",  
    ignorePatterns: ["private", "templates", ".obsidian"],   
    defaultDateType: "created",    
    generateSocialImages: true,    
    theme: {
      fontOrigin: "googleFonts",    
      cdnCaching: true,   
      typography: {
        header: "Noto Serif SC",      
        body: "Noto Sans SC",  
        code: "IBM Plex Mono",            
      },
      colors: {
        lightMode: {
          light: "rgb(255, 252, 240)",
          lightgray: "rgb(242, 240, 229)",
          gray: "#9c9384",
          darkgray: "#2A354B",
          dark: "#08142C",
          secondary: "#274B75",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#0c0f14",
          lightgray: "#1D232D",
          gray: "#5A657B",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7188A9",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false, 
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "relative", lazyLoad: true, openLinksInNewTab: true, prettyLinks: true }), 
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(), 
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}


export default config
