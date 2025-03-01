import { ComponentChildren } from "preact"
import { htmlToJsx } from "../../util/jsx"
import d3 from "d3"
import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
  QuartzCanvasComponent,
  CanvasNode,
  CanvasEdge,
  CanvasTextNode,
  CanvasFileNode,
  CanvasLinkNode,
  CanvasGroupNode,
} from "../types"
import { type FilePath, slugifyFilePath } from "../../util/path"
import fs from "fs"

function loadCanvas(file: FilePath): QuartzCanvasComponent {
  const data = fs.readFileSync(file, "utf8") ?? "{}"
  console.log(data)
  return JSON.parse(data) as QuartzCanvasComponent
}

function renderTextNodes(nodes: CanvasTextNode[]): ComponentChildren {
  return nodes.map((node) => (
    <div
      class="canvas canvas-node canvas-text-node"
      style={{
        position: "fixed",
        width: node.width,
        height: node.height,
        left: node.x,
        top: node.y,
      }}
    >
      {node["text"]}
    </div>
  ))
}

function renderFileNodes(nodes: CanvasFileNode[]): ComponentChildren {
  return nodes.map((node) => (
    <div
      class="internal alias internal-canvas"
      data-slug={slugifyFilePath(node.file as FilePath)}
      data-x={node.x}
      data-y={node.y}
      style={{
        position: "fixed",
        width: node.width,
        height: node.height,
        left: node.x,
        top: node.y,
      }}
    ></div>
  ))
}

function renderLinkNodes(nodes: CanvasLinkNode[]): ComponentChildren {
  return nodes.map((node) => (
    <iframe
      src={node["url"]}
      style={{
        position: "fixed",
        width: node.width,
        height: node.height,
        left: node.x,
        top: node.y,
      }}
    />
  ))
}

const CanvasContent: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
  //const content = htmlToJsx(fileData.filePath!, tree) as ComponentChildren
  const canvas = loadCanvas(fileData.filePath!)
  const canvasNodes = (canvas["nodes"] ?? []) as CanvasNode[]
  const canvasEdges = (canvas["edges"] ?? []) as CanvasEdge[]
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")

  // Canvas parts
  const textNodes = (canvasNodes.filter((node) => node["type"] === "text") ??
    []) as CanvasTextNode[]
  const fileNodes = (canvasNodes.filter((node) => node["type"] === "file") ??
    []) as CanvasFileNode[]
  const linkNodes = (canvasNodes.filter((node) => node["type"] === "link") ??
    []) as CanvasLinkNode[]
  const groupNodes = (canvasNodes.filter((node) => node["type"] === "group") ??
    []) as CanvasGroupNode[]

  const result = (
    <article class={classString}>
      {renderTextNodes(textNodes)}
      {renderFileNodes(fileNodes)}
      {renderLinkNodes(linkNodes)}
    </article>
  )

  //TODO: Implement canvas rendering
  return <article class={classString}>{result}</article>
}

export default (() => CanvasContent) satisfies QuartzComponentConstructor
