// quartz/plugins/redirects.ts
import { QuartzTransformerPlugin } from "../types"

export interface Options {
  redirects: Record<string, string>
}

export const Redirects: QuartzTransformerPlugin<Options> = (opts) => {
  return {
    name: "Redirects",
    async transform(ctx) {
      const pages = []
      
      // Create redirect pages for each entry in the redirects map
      for (const [fromPath, toUrl] of Object.entries(opts.redirects)) {
        // Create a simple HTML page with meta refresh and JS redirect
        const content = `
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0;url=${toUrl}">
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting to <a href="${toUrl}">${toUrl}</a>...</p>
  <script>window.location.href = "${toUrl}"</script>
</body>
</html>`

        // Create a FilePath for this redirect page
        const redirectPath = fromPath.startsWith("/") ? fromPath.slice(1) : fromPath
        
        // Add to the context
        ctx.pages.push({
          slug: redirectPath,
          // Creating a basic file representation
          file: {
            path: redirectPath,
            name: "index",
            ext: "html",
            content: Buffer.from(content)
          },
          contentType: "text/html"
        })
      }

      return ctx
    }
  }
}
