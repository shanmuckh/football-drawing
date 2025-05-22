// @flow
import { fabric } from 'fabric'
import { alternateIconColor } from '../options'

let itemCount = 1

// set item default settings here. this is also flow syntax
// https://github.com/facebook/flow/issues/183
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
  if (!variation) {
    // eslint-disable-next-line
    console.error('No item variation provided to addItem.js')
    return
  }

  fabric.loadSVGFromURL(src, (objects, options) => {
    // reset the alternate iconType color
    if (iconType === 'alternateIcon') objects[0].set({ fill: alternateIconColor })

    if (iconType === 'defaultIcon' && variation.includes('cone')) {
      objects.find(x => x.id === 'js-main-color').set({ fill: color })
      objects.find(x => x.id === 'js-underline').set({ fill: color })
    }

    const svgData = fabric.util.groupSVGElements(objects, options)

    svgData.set({
      left,
      top,
      sourcePath: src, // this tells the import/export to use this path, instead of embedding the code in the JSON
    })

    svgData.scaleToWidth(width)
    svgData.scaleToHeight(height)

    // add svgData into a group, so it's consistent with the way we create shirts
    const group = new fabric.Group([svgData], {
      id: `item-${itemCount}`,
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
    // store.addItem = group
  })
}
