import { QuartzTransformerPlugin } from "../types"

export const ChineseItalic: QuartzTransformerPlugin = () => {
  return {
    name: "ChineseItalic",
    externalResources() {
      return {
        css: [
          {
            // 内联 CSS 直接注入到页面
            content: `
              @font-face {
                font-family: 'ChineseItalic';
                font-style: italic;
                src: local('楷体'), 
                     local('Kaiti SC'),
                     local('STKaiti');
                unicode-range: U+4E00-9FFF;
              }

              em, .cm-em, i {
                font-family: 
                  -apple-system,
                  BlinkMacSystemFont,
                  'Segoe UI',
                  Roboto,
                  'ChineseItalic',
                  sans-serif;
                font-style: italic;
              }
            `,
          },
        ],
      }
    },
  }
}