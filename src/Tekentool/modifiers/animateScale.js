// @flow
import { fabric } from 'fabric'
import { scaleTransitionLength } from '../options'

/**
 * @param {object} target - the fabric object
 * @param {number} val - true for enlarge, false for shrink
 */
export default (target: any, val: number, canvas) => {
  fabric.util.animate({
    startValue: target.get('scaleX'),
    endValue: val,
    duration: scaleTransitionLength,
    easing: fabric.util.ease['easeInOutSine'],
    onChange: function (value) {
      target.scale(value)
      canvas.requestRenderAll()
    },
    onComplete: function () {
      target.setCoords()
    }
  })
}
