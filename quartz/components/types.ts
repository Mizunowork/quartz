import { ComponentType, JSX } from "preact"
import { StaticResources } from "../util/resources"
import { QuartzPluginData } from "../plugins/vfile"
import { GlobalConfiguration } from "../cfg"
import { Node } from "hast"
import { BuildCtx } from "../util/ctx"

export type QuartzComponentProps = {
  ctx: BuildCtx
  externalResources: StaticResources
  fileData: QuartzPluginData
  cfg: GlobalConfiguration
  children: (QuartzComponent | JSX.Element)[]
  tree: Node
  allFiles: QuartzPluginData[]
  displayClass?: "mobile-only" | "desktop-only"
} & JSX.IntrinsicAttributes & {
    [key: string]: any
  }

export type QuartzComponent = ComponentType<QuartzComponentProps> & {
  css?: string
  beforeDOMLoaded?: string
  afterDOMLoaded?: string
}

export type QuartzComponentConstructor<Options extends object | undefined = undefined> = (
  opts: Options,
) => QuartzComponent

export type QuartzCanvasComponent = {
  nodes?: CanvasNode[]
  edges?: CanvasEdge[]
}

export type CanvasNode = {
  id: string
  type: "text" | "file" | "link" | "group"
  x: number
  y: number
  width: number
  height: number
  color?: CanvasColor
}

export type CanvasTextNode = CanvasNode & {
  type: "text"
  text: string
}

export type CanvasFileNode = CanvasNode & {
  type: "file"
  file: string
  subpath?: string
}

export type CanvasLinkNode = CanvasNode & {
  type: "link"
  url: string
}

export type CanvasGroupNode = CanvasNode & {
  type: "group"
  label?: string
  background?: string
  backgroundStyle?: "cover" | "ratio" | "repeat"
}

export type CanvasEdge = {
  id: string
  fromNode: string
  toNode: string
  fromSide?: "top" | "bottom" | "left" | "right"
  toSide?: "top" | "bottom" | "left" | "right"
  fromEnd?: "none" | "arrow"
  toEnd?: "none" | "arrow"
  color?: CanvasColor
  label?: string
}

export type CanvasColor = "1" | "2" | "3" | "4" | "5" | "6" | "#${string}"
