// @flow
import { fabric } from 'fabric'

const initFieldText = canvas => new fabric.Text('', {
  left: canvas.width - 20,
  top: canvas.height * 0.5,
  fill: '#fff',
  fontFamily: 'baron-bold',
  fontSize: 14,
  angle: 90,
  opacity: 0.6,
  selectable: false,
  hoverCursor: 'defaultIcon',
  variation: 'field-text',
  name: 'field-text',
})

export default ({ canvas, e, setState, state }) => {
  const variation = e.target.dataset.variation
  const fieldSize = e.target.dataset.field

  const field = state.fieldTypes.find(x => x.variation === variation)

  setState({
    fieldSelected: field.variation
  })

  canvas.setBackgroundImage(field[state.iconType], canvas.requestRenderAll.bind(canvas), {
    left: canvas.width * 0.5,
    top: canvas.height * 0.5,
  })

  const existingTextObjs = canvas.getItemsByName('field-text')
  if (existingTextObjs.length) canvas.remove(existingTextObjs[0])

  const text = initFieldText(canvas)
  text.set('text', fieldSize)
  canvas.add(text)
  canvas.requestRenderAll()
}
