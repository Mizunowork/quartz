import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
        <div class="flex-container">
          <div>
            <p>
              {i18n(cfg.locale).components.footer.createdWith}{" 💙 with "}
              <a href="https://obsidian.md/">Obsidian</a>{", "}
              <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a>
              {", and "}
              <a href="https://pages.github.com/">Github Pages</a>.
              <br />
              This website does not use 🍪.
              <br />
              No AI was used to generate any kind of content.
            </p>
            <ul>
              {Object.entries(links).map(([text, link]) => (
                <li>
                  <a href={link}>{text}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
              <p>Recently watched
              <br />
              <a href="https://www.imdb.com/title/tt14253846/?ref_=tt_mv_close">Speak No Evil</a>
              </p>
              <img 
              src="https://m.media-amazon.com/images/M/MV5BOTJjMDMyMGYtZWU3ZS00OTVmLTg1ZWUtY2E4OGEyOGNmMjhiXkEyXkFqcGc@._V1_SX300.jpg"
              width="40%"></img>
          </div>
        </div>  
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
