
// @flow
/* globals require */
import { fabric } from 'fabric'
import draw from 'draw-svg-path'

const path = require('svg-path-properties')
const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1

const amplitude = 3

const svgEl = (document.createElementNS('http://www.w3.org/2000/svg', 'svg'): any)
const slavePathEl = (document.createElementNS('http://www.w3.org/2000/svg', 'path'): any)
svgEl.appendChild(slavePathEl)

// this is basically the same logic as makeSquiggleyLine, but tweaked to be zigzagged instead
const makeZigZag = stringifiedSvgPath => {
  let fakeSlavePathEl: any = {}

  let pathLen = 0
  if (isFirefox) {
    fakeSlavePathEl = path.svgPathProperties(stringifiedSvgPath)
    pathLen = fakeSlavePathEl.getTotalLength()
  } else {
    slavePathEl.setAttribute('d', stringifiedSvgPath)
    pathLen = slavePathEl.getTotalLength()
  }

  let pos = isFirefox ? fakeSlavePathEl.getPointAtLength(0) : slavePathEl.getPointAtLength(0)
  let newPath = 'M' + [pos.x, pos.y].join(',')
  const numSteps = 2

  for (let i = 1; i <= numSteps; i++) {
    const last = pos
    pos = isFirefox ? fakeSlavePathEl.getPointAtLength(i * pathLen / numSteps) : slavePathEl.getPointAtLength(i * pathLen / numSteps)

    const vector = {
      x: (pos.x - last.x),
      y: (pos.y - last.y),
    }

    const vectorLen = Math.sqrt(vector.x * vector.x + vector.y * vector.y)

    if (vectorLen === 0) continue // this bails out of the loop

    const half = {
      x: last.x + vector.x,
      y: last.y + vector.y
    }

    const perpVector = {
      x: -(amplitude * vector.y / vectorLen),
      y: (amplitude * vector.x / vectorLen)
    }

    if (i === numSteps) {
      // this is the last pointy bit before we hit the end of the line where the arrow is
      // we straighten out the line so it aligns with the arrowhead
      newPath += (' ' + [pos.x, pos.y, pos.x, pos.y].join(','))
    } else {
      // otherwise this is just any other pointy bit
      const controlPoint = {
        x: half.x + perpVector.x,
        y: half.y + perpVector.y,
      }
      newPath += (' ' + [controlPoint.x, controlPoint.y, pos.x, pos.y].join(','))
    }
  }
  return newPath
}

export default fabric.util.createClass(fabric.Path, {
  type: 'ShotLine',

  // this weirdly looks a lot like React
  initialize: function (path, options) {
    this.options = options
    this.callSuper('initialize', path, options)
  },

  _render: function (ctx) {
    let stringifiedSvgPath = this.path.toString()
    // console.log(stringifiedSvgPath)

    stringifiedSvgPath = stringifiedSvgPath.replace(/M,/g, 'M').replace(/Q,/g, 'Q')

    const zigZaggedSvgPath = makeZigZag(stringifiedSvgPath)

    ctx.strokeStyle = this.options.stroke
    ctx.lineWidth = this.options.strokeWidth
    ctx.beginPath()
    draw(ctx, zigZaggedSvgPath) // replaces new Path2D
    ctx.stroke()
    ctx.closePath()
  },
})
