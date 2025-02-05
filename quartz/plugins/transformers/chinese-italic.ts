import { QuartzTransformerPlugin } from "../types"

interface Options {
  // 可扩展选项（如自定义字体名）
}

export const ChineseItalic: QuartzTransformerPlugin<Options> = (opts) => {
  return {
    name: "ChineseItalic",
    externalResources() {
      return {
        css: [{ content: "static/chinese-italic-kaiti.css" }],
      }
    },
  }
}