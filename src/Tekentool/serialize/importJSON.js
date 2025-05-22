// @flow
import rebuildLines from './rebuildLines'
// import store from '../store'

export default (input: ?{}, canvas, isDisplayOnly: bool, iconType) => {
  canvas.clear()

  const savedJSON = input || prompt('Paste JSON here')
  // the input json, the callback, the data
  let lineGroups = []
  // fabric cant load event handlers back from json
  // so we have to write that functinoality ourself
  // that's whats happening inside rebuild lines.
  canvas.loadFromDatalessJSON(savedJSON, () => rebuildLines(lineGroups, canvas, isDisplayOnly), (data, o) => {
    if (o.variation === 'field-text') return

    // generate an array of objects, each containing coordinate data about a line
    if (o.variation.includes('line')) {
      lineGroups[o.id] = {
        ...lineGroups[o.id],
        [o.name]: {
          variation: o.variation,
          top: o.top,
          left: o.left,
        }
      }
      return
    }

    // adjust the stack ordering of goal items.
    // if (o.variation.includes('goal')) {
    // const isFlipped = o.get('flipY')
    // in a timeout because fabric hasn't rendered yet
    // if (isFlipped) setTimeout(() => o.bringToFront(), 0)
    // }

    // dont modify colors of alternate icons
    // this is how i tell if it's an alternate icon, i'm at wits end.
    // if (o.getObjects()[0].fill === '#333') return
    if (savedJSON.iconType === 'alternateIcon') return

    // we need to tell fabric to set the fill attribute
    // which you'd expect fabric to do by itself, but hey it's fabric 🤷‍♀️
    const objs = o.getObjects()[0].getObjects()

    if (o.variation.includes('shirt')) {
      objs.find(x => x.id === 'js-main-color').set({ fill: o.color })
    }
    if (o.variation.includes('cone')) {
      objs.find(x => x.id === 'js-main-color').set({ fill: o.color })
      objs.find(x => x.id === 'js-underline').set({ fill: o.color })
    }
  })

  canvas.requestRenderAll()
}
