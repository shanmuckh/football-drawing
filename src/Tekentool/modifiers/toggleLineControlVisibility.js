// @flow

import { lineControlStyles, lineControlFadeTransitionLength } from '../options'

/**
 * @param {boolean} show - true for fade in, false for fade out
 * @param {array} [objects] - optional, an array of items to fade in or out
 * @param {object} canvas - the canvas instance
 */
export default ({ show, objects, canvas }) => {
  const allObjs = objects || canvas.getObjects()
  allObjs.forEach((obj: any) => {
    if (obj.variation && obj.variation.includes('line')) {
      obj.animate('opacity', show ? lineControlStyles.opacity : '0.01', {
        duration: lineControlFadeTransitionLength,
        onChange: canvas.requestRenderAll.bind(canvas),
      })
    }
  })
}
