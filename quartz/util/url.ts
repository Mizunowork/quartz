/**
 * Extracts file extension from a file resource URL.
 *
 * @param url - URL to extract the file extension from
 * @returns The file extension (with a preceding dot) or undefined if none found
 */
export function getExtFromUrl(url: string): string | undefined {
  const urlObj = new URL(url)
  const pathname = urlObj.pathname
  // Remove any query parameters or hash first
  const ext = pathname.split(/[#?]/)[0].split(".").pop()?.trim()
  return ext === pathname ? undefined : "." + ext
}
