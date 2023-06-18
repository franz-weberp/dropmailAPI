export function copyToClipboard(clipContent) {
  return navigator.clipboard.writeText(clipContent)
}