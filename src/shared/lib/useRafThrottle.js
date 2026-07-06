export function useRafThrottle(fn) {
  let frame = 0
  let lastEvent = null

  const flush = () => {
    frame = 0
    if (lastEvent) fn(lastEvent)
  }

  const handler = (event) => {
    lastEvent = event
    if (!frame) frame = requestAnimationFrame(flush)
  }

  const cancel = () => {
    if (frame) {
      cancelAnimationFrame(frame)
      frame = 0
    }
    lastEvent = null
  }

  return { handler, cancel }
}
