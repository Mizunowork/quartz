import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import * as fs from "fs"
import * as path from "path"
/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */

const configPath = process.env.QUARTZ_CONFIG_PATH || path.resolve(__dirname, "config.json")

const rawData = fs.readFileSync(configPath, "utf-8")
const configData = JSON.parse(rawData)

function loadPlugins<T>(pluginList: { name: string; config?: Record<string, unknown> }[]): T[] {
  return pluginList.map((plugin) => {
    if (plugin.config) {
      return (Plugin as any)[plugin.name](plugin.config)
    }
    return (Plugin as any)[plugin.name]()
  })
}

const config: QuartzConfig = {
  configuration: configData.configuration,
  plugins: {
    transformers: loadPlugins(configData.plugins.transformers),
    filters: loadPlugins(configData.plugins.filters),
    emitters: loadPlugins(configData.plugins.emitters),
  },
}

export default config
