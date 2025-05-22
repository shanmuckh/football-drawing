import { fabric } from 'fabric'
import { shirtTypes, goalTypes, coneTypes, itemTypes } from '../assets/assets'
import { alternateIconColor } from '../options'

const updateImgOnCanvas = (canvas, o, iconType) => {
  const variation = o.variation
  const spreadArr = [...shirtTypes, ...goalTypes, ...itemTypes, ...coneTypes]

  const found = spreadArr.find(i => i.variation === variation)

  const src = found[iconType]
  const width = found.width
  const height = found.height

  fabric.loadSVGFromURL(src, (objects, options) => {
    // group together all the svg elements that make up the shirt
    const svgData = fabric.util.groupSVGElements(objects, options)
    const isShirt = o.variation.includes('shirt')
    const isCone = o.variation.includes('cone')

    // set the shirt color
    if (isShirt && iconType === 'defaultIcon') {
      objects[0].set({ fill: o.color })
    }

    if (isCone && iconType === 'defaultIcon') {
      objects.find(x => x.id === 'js-main-color').set({ fill: o.color })
      objects.find(x => x.id === 'js-underline').set({ fill: o.color })
    }
    // reset the alternate iconType color
    if (iconType === 'alternateIcon') objects[0].set({ fill: alternateIconColor })

    svgData.scaleToWidth(width)
    svgData.scaleToHeight(height)
    svgData.set({
      dirty: true,
      left: o.left,
      top: o.top,
      sourcePath: src,
    })

    o.addWithUpdate(svgData)
    svgData.sendToBack() // ensure that the icon always sits behind the text (like if its a shirt)

    canvas.requestRenderAll()
  })
}

export default (canvas, iconType) => {
  // update the src images in the canvas
  canvas.getObjects().forEach(o => {
    // currently looping thru every object on the canvas
    // exclude lines and line control points from proceeding
    if (!o.name && !o.path) {
      // objects are groups. we need to loop through the items within.
      // loop through the group and remove the existing svg file
      o.getObjects().forEach(i => {
        if (i.sourcePath) o.remove(i)
      })

      updateImgOnCanvas(canvas, o, iconType)
    }
  })
}
