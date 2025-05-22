// @flow
import addShirt from '../../modifiers/addShirt'
import addItem from '../../modifiers/addItem'
import { shirtTypes, goalTypes, coneTypes, itemTypes } from '../../assets/assets'

export default (canvas, iconType) => {
  // to copy something, first we must get the currently active object
  const activeObj = canvas.getActiveObject()

  if (!activeObj) return // (we can only copy something if something is actually selected)

  const variation = activeObj.variation
  if (variation === 'lineControl') return // lines/lineControls are not able to be copied

  const copyOffset = 20
  const top = activeObj.top + copyOffset
  const left = activeObj.left + copyOffset

  const spreadArr = [...shirtTypes, ...goalTypes, ...itemTypes, ...coneTypes]
  const found = spreadArr.find(i => i.variation === variation)

  const src = found[iconType]
  const width = found.width
  const height = found.height
  const defaultIcon = found.defaultIcon
  const alternateIcon = found.alternateIcon
  const color = found.color

  // now that we know what kind of object we are copying, we simply re-create it using addItem or addShirt
  if (variation.includes('shirt')) {
    addShirt({ left, top, variation, color, canvas, src, width, height, defaultIcon, alternateIcon, iconType })
  } else {
    addItem({ left, top, variation, color, canvas, src, width, height, defaultIcon, alternateIcon, iconType })
  }
}
