// @flow
import store from '../../store'

export default (canvas) => {
  const activeObj = canvas.getActiveObject()
  store.selection = {}

  store.removeItem = activeObj

  // if no object is actually active, then bail out
  if (!activeObj) return

  if (activeObj.pathLine) {
    // lines consist of multiple elements, we must manually remove each one
    canvas.remove(activeObj.pathLine)
    canvas.remove(activeObj.arrowHead)
    canvas.remove(activeObj.pointStart)
    canvas.remove(activeObj.pointEnd)
    canvas.remove(activeObj.pointCurve)
  }

  // the item is about to be removed, so de-select it
  canvas.discardActiveObject()

  canvas.remove(activeObj)
}
