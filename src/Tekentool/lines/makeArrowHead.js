// @flow
import { fabric } from 'fabric'

export default (left: number, top: number, angle: number) =>
  new fabric.Triangle({
    left,
    top,
    angle,
    originX: 'center',
    originY: 'center',
    hasBorders: false,
    hasControls: false,
    selectable: false,
    lockScalingX: true,
    lockScalingY: true,
    lockRotation: true,
    name: 'arrowHead',
    width: 10,
    height: 10,
    fill: '#fff',
    excludeFromExport: true, // we re-generate the arrowhead on import
  })
