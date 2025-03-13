import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface ArticleTitleOptions {
  hideOnRoot: boolean
}

const defaultOptions: ArticleTitleOptions = {
  hideOnRoot: false
}

export default ((opts?: Partial<ArticleTitleOptions>) => {
  const options: ArticleTitleOptions = { ...defaultOptions, ...opts }

  const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    // Hide article title on root if enabled
    if (opts?.hideOnRoot && fileData.slug === "index") {
      return null
    }

    const title = fileData.frontmatter?.title
    if (title) {
      return <h1 class={classNames(displayClass, "article-title")}>{title}</h1>
    } else {
      return null
    }
  }

  ArticleTitle.css = `
  .article-title {
    margin: 2rem 0 0 0;
  }
  `

  return ArticleTitle
}) satisfies QuartzComponentConstructor
