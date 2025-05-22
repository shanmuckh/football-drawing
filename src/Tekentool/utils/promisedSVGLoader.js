// This file generates SVGs. For example the Shirt and the Cones only use 1 SVG file each, but they output multiple variations of colour.
// This is done by importing the SVG file onto a temporary Fabric canvas, modifying the color of the objects within the SVG,
// then exporting the modified SVG data, which is resolved and returned so that React can render it.

import { fabric } from 'fabric'
import { alternateIconColor } from '../options'

export default ({ src, color, variation, iconType }) => {
  return new Promise(function (resolve, reject) {
    fabric.loadSVGFromURL(src, (objects, options) => {
      const canvasTemp = new fabric.Canvas()

      // access the shirt object, and modify its color, only if it's the default iconType, not the symbol
      if (variation.includes('shirt') && iconType === 'defaultIcon') {
        const fill = color || '#fff'
        objects[0].set({ fill })
      }
      // same goes for the cones
      if (variation.includes('cone') && iconType === 'defaultIcon') {
        const fill = color || '#fff'
        objects.find(x => x.id === 'js-main-color').set({ fill })
        objects.find(x => x.id === 'js-underline').set({ fill })
      }
      // reset the alternate iconType color
      if (iconType === 'alternateIcon') objects[0].set({ fill: alternateIconColor })

      const svgData = fabric.util.groupSVGElements(objects, options)
      canvasTemp.add(svgData)
      svgData.scaleToWidth(options.width)
      svgData.scaleToHeight(options.height)

      const svgOutput = canvasTemp.toSVG({
        width: options.width,
        height: options.height,
        suppressPreamble: true,
        viewBox: {
          x: iconType === 'defaultIcon' ? -options.width * 0.5 : 0, // TODO: double check these when we have final svg assets
          y: iconType === 'defaultIcon' ? -options.height * 0.5 : 0,
          width: options.width,
          height: options.height,
        }
      })

      resolve(svgOutput)
    })
  })
}
