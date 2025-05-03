import { concatenateResources } from "../util/resources"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface GroupConfig {
  components: QuartzComponent[]
}

export default ((config: GroupConfig) => {
  const Group: QuartzComponent = (props: QuartzComponentProps) =>
    config.components.map((C: QuartzComponent) => <C {...props} />)

  Group.afterDOMLoaded = concatenateResources(...config.components.map((c) => c.afterDOMLoaded))
  Group.beforeDOMLoaded = concatenateResources(...config.components.map((c) => c.beforeDOMLoaded))
  Group.css = concatenateResources(...config.components.map((c) => c.css))
  return Group
}) satisfies QuartzComponentConstructor<GroupConfig>
