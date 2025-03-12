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
      fontOrigin: "local", 
      cdnCaching: true,
      typography: {
        header: "LXGW WenKai",      
        body: "LXGW WenKai",    
        code: "IBM Plex Mono",   
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5", 
          gray: "#b8b8b8", 
          darkgray: "#4e4e4e", 
          dark: "#2b2b2b",
          secondary: "#7992a0",  
          tertiary: "#7992a0",  
          highlight: "rgba(143, 159, 169, 0.15)", 
          textHighlight: "#fff23688", 
        },
        darkMode: { 
          light: "#161618",
          lightgray: "#393639",  
          gray: "#646464",
          darkgray: "#d4d4d4", 
          dark: "#ebebec", 
          secondary: "#7b97aa",   
          tertiary: "#7b97aa", 
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
      Plugin.CrawlLinks({ markdownLinkResolution: "relative", lazyLoad: true }), 
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
