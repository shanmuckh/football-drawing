// @flow
import { fabric } from 'fabric'
import store from '../store'
import SquiggleyLine from './makeSquiggleyLine'
import ShotLine from './makeShotLine'

const defaultPath = 'M 0 0 Q 0 0 1 0'
const defaultLineOptions = {
  objectCaching: false,
  selectable: false,
  hasBorders: false,
  hasControls: false,
  excludeFromExport: true, // because we use the point data to generate the line, we don't need to serialise the line itself
  fill: null,
  stroke: '#fff',
  strokeWidth: 3,
}

export default (rebuildingLineType?: string) => {
  const switchKey = rebuildingLineType || store.lineType

  // these are the variety of line types which can be used
  switch (switchKey) {
    case 'line-squiggley':
      return new SquiggleyLine(defaultPath, { ...defaultLineOptions })
    case 'line-shot':
      return new ShotLine(defaultPath, { ...defaultLineOptions })
    case 'line-dotted':
      return new fabric.Path(defaultPath, { ...defaultLineOptions, strokeDashArray: [5, 3] })
    case 'line-solid':
      return new fabric.Path(defaultPath, { ...defaultLineOptions })
    default:
      console.log('Called makePathLine without a lineType. Falling back to line-solid') // eslint-disable-line
      // if for some reason nothing is provided, just stick with a solid line as a default
      return new fabric.Path(defaultPath, { ...defaultLineOptions })
  }
}
