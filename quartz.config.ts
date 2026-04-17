import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
// Import della nostra trasformazione custom
import HelloFence from "./quartz/plugins/custom/HelloFence"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Aelan Unlimited by Faber",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "aelan-bit.github.io/AelanWorld",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Uncial Antiqua",
        body: "IM Fell English",
        code: "MedievalSharp",
      },
      colors: {
        lightMode: {
          light: "#f5e6d3",      // warm parchment
          lightgray: "#e8d5be",  // darker parchment
          gray: "#a89078",       // muted brown
          darkgray: "#5c4a3d",   // sepia brown (body text)
          dark: "#2d1f14",       // dark ink (headings)
          secondary: "#8b2942",  // burgundy red (links)
          tertiary: "#b8860b",   // dark gold (accents)
          highlight: "rgba(184, 134, 11, 0.15)",
          textHighlight: "#f0c05088",
        },
        darkMode: {
          light: "#1f1610",      // deep brown leather
          lightgray: "#3d2e24",  // lighter brown
          gray: "#6b5344",       // warm gray-brown
          darkgray: "#d4c4b0",   // cream text
          dark: "#f5e6d3",       // light parchment (headings)
          secondary: "#c9a959",  // gold (links)
          tertiary: "#a65d57",   // muted red
          highlight: "rgba(201, 169, 89, 0.15)",
          textHighlight: "#c9a95988",
        },
      },
    },
  },
  plugins: {
    transformers: [
      // 1) Legge il frontmatter e lo mette in fileData.frontmatter
      Plugin.FrontMatter(),
      /* 2) QUI il nostro transformer: manipola l'AST markdown *dopo* il frontmatter,
         ma *prima* che Obsidian/GitHub-Flavored Markdown facciano il loro lavoro.
      */
      HelloFence(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
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
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
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
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
