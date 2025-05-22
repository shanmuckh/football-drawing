// @flow
// this file does mostly the same thing as addItem.js
// its separated though because eventually custom shirt designs will need to be added
import { fabric } from 'fabric'
import { alternateIconColor } from '../options'

let itemCount = 1

export default ({
  src,
  left,
  top,
  variation,
  color,
  canvas,
  width,
  height,
  defaultIcon,
  alternateIcon,
  iconType
}: {
  src: string,
  left: number,
  top: number,
  variation: string,
  color: string,
  canvas: any,
  width: number,
  height: number,
  defaultIcon: string,
  alternateIcon: string,
  iconType: string,
}) => {
  fabric.loadSVGFromURL(src, (objects, options) => {
    // access the shirt object, and modify its color, if needed.
    objects[0].set({ fill: iconType === 'defaultIcon' ? color : alternateIconColor })

    // group together all the svg elements that make up the shirt
    const svgData = fabric.util.groupSVGElements(objects, options)

    // sourcePath tells the import/export to use this path, instead of embedding the code in the JSON
    svgData.set({ left, top, sourcePath: src, })
    svgData.scaleToWidth(width)
    svgData.scaleToHeight(height)

    // only shirts have the text element
    // initial text is an empty string
    const text = new fabric.Text('', {
      left,
      top: top - 8, // pull the number up a little bit on the shirt
      fill: '#fff',
      fontFamily: 'Helvetica',
      fontSize: 14,
    })

    // group the svgGroup and text items into the same group (so they're always dragged together)
    const group = new fabric.Group([svgData, text], {
      id: `shirt-${itemCount}`,
      left,
      top,
      // images dont need to be stretched, rotated, etc. keep it simple
      hasBorders: true,
      hasControls: false,
      variation,
      color,
      defaultIcon,
      alternateIcon,
    })

    itemCount++

    // make the newly created shirt the active object
    canvas.setActiveObject(group)

    canvas.add(group)
  })
}
