// @flow
import { fabric } from 'fabric'
import { lineControlStyles } from '../options'

export default (left: number, top: number) =>
  new fabric.Circle({
    left: left,
    top: top,
    ...lineControlStyles,
    // the control circles should not get the fabric editors
    hasBorders: true,
    hasControls: false,
    objectCaching: true,
  })
