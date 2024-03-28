# 🌱 Forgetful Notes

![code size](https://img.shields.io/github/languages/code-size/semanticdata/forgetful-notes) ![repository size](https://img.shields.io/github/repo-size/semanticdata/forgetful-notes) ![commits](https://img.shields.io/github/commit-activity/t/semanticdata/forgetful-notes) ![last commit](https://img.shields.io/github/last-commit/semanticdata/forgetful-notes) ![is website up?](https://img.shields.io/website/https/forgetfulnotes.com.svg)

[Forgetful Notes](https://forgetfulnotes.com) is my _digital garden_ of knowledge. It serves as a platform for my learning and creative endeavours. A space for thinking through, building upon, and coming back to.

[![Github Pages](https://img.shields.io/badge/github%20pages-121013?style=for-the-badge&logo=github&logoColor=white)](https://semanticdata.github.io/eleventy-notes/) [![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://eleventy-notes-chi.vercel.app)

## 📑 Table of Contents

- [🌱 Forgetful Notes](#-forgetful-notes)
  - [📑 Table of Contents](#-table-of-contents)
  - [⚡ Quick start](#-quick-start)
  - [✨ Features](#-features)
  - [📄 Background](#-background)
  - [👨🏼‍💻 Useful Commands](#-useful-commands)
  - [🎨 Customization](#-customization)
  - [📁 Folder Structure](#-folder-structure)
  - [🛠️ Technology](#️-technology)
  - [© License](#-license)

## ⚡ Quick start

**1. Clone repo**

```bash
git clone https://github.com/semanticdata/forgetful-notes.git
```

**2. Install dependencies**

```sh
pnpm install
```

**3. Run the project locally**

```sh
pnpm start
```

## ✨ Features

- Fast Natural-Language Search
- Bidirectional Backlinks
- Floating Link Previews
- Admonition-style Callouts
- Markdown Links and Wikilinks Support
- Latex Support

## 📄 Background

Forgetful Notes is created using [Quartz](https://github.com/jackyzha0/quartz), hosted on [GitHub](https://github.com/), deployed with [GitHub Pages](https://pages.github.com/), and facilitated by the GitHub [Publisher](https://github.com/ObsidianPublisher) plugin for [Obsidian](https://obsidian.md/).

The website has gone through many changes. I have not been shy about moving from technology to technology as I learn new things. Coming across the world of _Static Site Generators_ was a game changer. I have ran my notes through [Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/), [MkDocs](https://squidfunk.github.io/mkdocs-material/), [Zola](https://www.getzola.org/), and most recently [11ty](https://11ty.dev).

## 👨🏼‍💻 Useful Commands

**Install dependencies**

```sh
npm install
```

**Update dependencies**

```sh
npm update
```

**Start local server**

```sh
npm start
```

**Update Quartz**

```sh
npm run update
```

**Sync the repo**

```sh
npm run sync
```

**Build only**

```sh
npm run build
```

**Read about a command**

```sh
npx quartz <command> --help
```

## 🎨 Customization

### Stylesheets

You can add custom CSS code within `/quartz/styles/custom.scss`. You will then need to uncomment line 4 of `/quartz/styles/base.scss` to have it take effect.

### Fonts

| Used in: | Font Family | Previous Font |
| --- | :-: | :-: |
| Headers | [Bitter](https://fonts.google.com/specimen/Bitter) | [Schibsted Grotesk](https://fonts.google.com/specimen/Schibsted+Grotesk) |
| Body | [Bitter](https://fonts.google.com/specimen/Bitter) | [Source Sans Pro](https://fonts.google.com/specimen/Source+Sans+3) |
| Code | [Fira Mono](https://fonts.google.com/specimen/Fira+Mono) | [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) |

## 📁 Folder Structure

<details>
<summary>Show/Hide</summary>

```plaintext
.
├── .github/
│   └── workflows/
│       ├── build.yml
│       └── deploy.yml
├── content/
│   ├── notes.md
│   ├── pages.md
│   └── ...
├── docs/
│   ├── documentation.md
│   └── ...
├── quartz/
│   ├── cli/
│   │   ├── args.js
│   │   ├── constants.js
│   │   ├── handlers.js
│   │   └── helpers.js
│   ├── components/
│   │   ├── pages/
│   │   ├── scripts/
│   │   ├── styles/
│   │   ├── Backlinks.tsx
│   │   ├── Explorer.tsx
│   │   └── ...
│   ├── plugins/
│   │   ├── emitters/
│   │   ├── filters/
│   │   ├── transformers/
│   │   ├── index.ts
│   │   ├── types.ts
│   │   └── vfile.ts
│   ├── processors/
│   │   ├── emit.ts
│   │   ├── filter.ts
│   │   └── parse.ts
│   ├── static/
│   │   ├── favicon.ico
│   │   ├── site.manifest
│   │   └── ...
│   ├── styles/
│   │   ├── base.scss
│   │   ├── callouts.scss
│   │   ├── custom.scss
│   │   ├── syntax.scss
│   │   └── variables.scss
│   ├── util/
│   │   ├── theme.ts
│   │   ├── jsx.tsx
│   │   └── ...
│   ├── bootstrp.cli.mjs
│   ├── bootstrap-worker.njs
│   ├── build.ts
│   ├── cfg.ts
│   └── worker.ts
├── .gitattributes
├── .gitignore
├── .npmrc
├── .prettierignore
├── .prettierrc
├── Dockerfile
├── LICENSE
├── README.md
├── globals.d.ts
├── index.d.ts
├── package-lock.json
├── package.json
├── quartz.config.ts
├── quartz.layout.ts
├── screenshot.png
└── tsconfig.json
```

</details>

## 🛠️ Technology

The site uses various technologies cobbled together. It's powered by [Quartz](https://github.com/jackyzha0/quartz/) and [Obsidian](https://obsidian.md). You can read the [Documentation](https://quartz.jzhao.xyz/), and join the [Discord Community](https://discord.gg/cRFFHYye7t).

Here's some of them:

- [Quartz](https://github.com/jackyzha0/quartz): a fast, batteries-included static-site generator.
- [Prettier](https://github.com/prettier/prettier): an opinionated code formatter.
- [Sass](https://github.com/sass/sass): makes CSS fun!
- [TypeScript](https://github.com/microsoft/TypeScript): superset of JavaScript that compiles to clean JavaScript output.

All content for the site is written in _Markdown_ within [Obsidian](https://obsidian.md/)—an extensible, flexible note-taking app. To export the notes from Obsidian, I rely on the [GitHub Publisher](https://github.com/ObsidianPublisher) plugin.

## © License

Source code in this repository is available under the [MIT License](LICENSE).
