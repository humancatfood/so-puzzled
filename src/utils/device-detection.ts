export function isMobile() {
  return Boolean(
    'ontouchstart' in document.documentElement &&
      navigator.userAgent.match(/Mobi/),
  )
}
