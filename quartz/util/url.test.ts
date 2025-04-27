import { describe, it } from "node:test"
import { getExtFromUrl } from "./url"
import assert from "node:assert/strict"

describe("getExtFromUrl", () => {
  it("should return the correct file extension from a URL", () => {
    const url = "https://example.com/image.jpg"
    const ext = getExtFromUrl(url)
    assert.strictEqual(ext, ".jpg")
  })

  it("should return undefined for URLs without an extension", () => {
    const url = "https://example.com/image"
    const ext = getExtFromUrl(url)
    assert.strictEqual(ext, undefined)
  })

  it("should handle URLs with query parameters", () => {
    const url = "https://example.com/image.jpg?size=large"
    const ext = getExtFromUrl(url)
    assert.strictEqual(ext, ".jpg")
  })

  it("should handle URLs with hash fragments", () => {
    const url = "https://example.com/image.jpg#section1"
    const ext = getExtFromUrl(url)
    assert.strictEqual(ext, ".jpg")
  })
})
