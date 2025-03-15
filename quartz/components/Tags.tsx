import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/tags.scss"
// @ts-ignore
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

export default (() => {
  const Tags: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    return (
      <a href="/tags" class="toggle tags-link" tabIndex={-1}>
        <button class="tags-button" id="tags-button">
          <svg
            viewBox="0 0 25 25"
            xmlns="http://www.w3.org/2000/svg">
            <g>
              <path
                d="M 4.2086894,1.2393355 A 2.969084,2.9712454 0 0 0 1.2403355,4.2098501 V 11.59051 a 2.969084,2.9712454 0 0 0 0.8696829,2.101561 l 9.2194546,9.224802 a 2.969084,2.9712454 0 0 0 4.197341,-0.0014 l 7.373929,-7.379266 a 2.969084,2.9712454 0 0 0 0.0014,-4.200397 L 13.684012,2.1096514 A 2.969084,2.9712454 0 0 0 11.58398,1.2393355 Z" />
              <circle
                cy="6.5883951"
                cx="6.5883951"
                r="2.6196454" />
            </g>
          </svg>
        </button>
      </a>
    )
  }

  Tags.css = style

  return Tags
}) satisfies QuartzComponentConstructor
