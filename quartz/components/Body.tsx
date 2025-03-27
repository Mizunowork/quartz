// @ts-ignore
import clipboardScript from "./scripts/clipboard.inline"
import clipboardStyle from "./styles/clipboard.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Body: QuartzComponent = ({ children }: QuartzComponentProps) => {
  return 
    <div id="quartz-body">{children}
    <div id="tcomment"></div>
      <script src="https://cdn.jsdelivr.net/npm/twikoo@1.6.41/dist/twikoo.min.js"></script>
      <script>
        twikoo.init({
          envId: 'https://enneatwikoo.netlify.app/.netlify/functions/twikoo', // 腾讯云环境填 envId；Vercel 环境填地址（https://xxx.vercel.app）
          el: '#tcomment', // 容器元素
        })
      </script>
    </div>
}

Body.afterDOMLoaded = clipboardScript
Body.css = clipboardStyle

export default (() => Body) satisfies QuartzComponentConstructor
