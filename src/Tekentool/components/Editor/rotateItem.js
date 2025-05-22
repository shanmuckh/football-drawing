// @flow
import { fabric } from 'fabric'

let isAnimating = false

export default (canvas) => {
  if (isAnimating) return
  const activeObj = canvas.getActiveObject()
  if (!activeObj) return

  const right = 90
  const flipThreshold = 25
  const angle = activeObj.get('angle') + right

  activeObj.animate('angle', angle, {
    duration: 275,
    easing: fabric.util.ease['easeOutBack'],
    onChange: function(ang) {
      isAnimating = true
      // if the goal is rotated 180 degrees, bring it to the top of the stack,
      // and flip it so that it looks like it hasn't been rotated at all
      if ((ang % 360) > right + flipThreshold) {
        activeObj.set('flipY', true)
        activeObj.bringToFront()
        canvas.bringToFront(activeObj)
      }
      if ((ang % 360) > right * 2 + flipThreshold) {
        activeObj.set('flipY', false)
        activeObj.sendToBack()
      }
      canvas.requestRenderAll()
    },
    onComplete: function() {
      isAnimating = false
    }
  })
}
