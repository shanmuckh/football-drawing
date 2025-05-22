// @flow

import { fabric } from 'fabric'
import { backgroundColor, canvasWidth as width, canvasHeight as height } from './options'

export default (canvasEl, isDisplayOnly: bool) => {
  const canvasType = isDisplayOnly ? 'StaticCanvas' : 'Canvas'
  return new fabric[canvasType](canvasEl, {
    isDrawingMode: false,
    selection: false,
    // perPixelTargetFind: true,
    // defaultCursor: 'crosshair',
    hoverCursor: '-webkit-grab',
    moveCursor: '-webkit-grabbing',
    preserveObjectStacking: true, // false == last touched item takes stack priority
    backgroundColor,
    width,
    height,
  })
}
