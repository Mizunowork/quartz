import { DateTime } from "luxon"
import { GlobalConfiguration } from "../cfg"
import { ValidLocale } from "../i18n"
import { QuartzPluginData } from "../plugins/vfile"

interface Props {
  date: DateTime
  locale?: ValidLocale
}

export type ValidDateType = keyof Required<QuartzPluginData>["dates"]

export function getDate(cfg: GlobalConfiguration, data: QuartzPluginData): DateTime | undefined {
  if (!cfg.defaultDateType) {
    throw new Error(
      `Field 'defaultDateType' was not set in the configuration object of quartz.config.ts. See https://quartz.jzhao.xyz/configuration#general-configuration for more details.`,
    )
  }
  const types = cfg.defaultDateType instanceof Array ? cfg.defaultDateType : [cfg.defaultDateType]
  return types.map((p) => data.dates?.[p]).find((p) => p != null)
}

export function formatDate(d: DateTime, locale: ValidLocale = "en-US"): string {
  return d.toLocaleString(
    {
      year: "numeric",
      month: "short",
      day: "2-digit",
    },
    { locale: locale },
  )
}

export function Date({ date, locale }: Props) {
  return <time datetime={date.toISO() || ""}>{formatDate(date, locale)}</time>
}
