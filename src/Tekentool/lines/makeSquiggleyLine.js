// @flow
/* globals require */
import { fabric } from 'fabric'
import draw from 'draw-svg-path'

// firefox doesn't support SVG getTotalLength() or getPointAtLength()
// so we use this library to replace these functions
// and user agent sniffing to determine which one to use
const path = require('svg-path-properties')
const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1

const waveLength = 6
const amplitude = 3

// create an svg and a path element within it.
// this is a virtual dom node which never gets rendered
// we just use it as a slave to measure path lengths with
const svgEl = (document.createElementNS('http://www.w3.org/2000/svg', 'svg'): any)
const slavePathEl = (document.createElementNS('http://www.w3.org/2000/svg', 'path'): any)
svgEl.appendChild(slavePathEl)

// Adapted from: https://stackoverflow.com/questions/42441472/draw-a-squiggly-line-in-svg
const makeSquiggle = stringifiedSvgPath => {
  let fakeSlavePathEl: any = {}
  let pathLen = 0
  if (isFirefox) {
    // firefox uses the library implementation.
    fakeSlavePathEl = path.svgPathProperties(stringifiedSvgPath)
    pathLen = fakeSlavePathEl.getTotalLength()
  } else {
    // other browsers use the native implementation.
    // set the initial 'd' attribute on the slave path, so that we can measure it with getTotalLength()
    // which is a native <svg> tag function
    slavePathEl.setAttribute('d', stringifiedSvgPath)
    pathLen = slavePathEl.getTotalLength()
  }

  // Adjust step so that there are a whole number of steps along the path
  let pos = isFirefox ? fakeSlavePathEl.getPointAtLength(0) : slavePathEl.getPointAtLength(0)
  let newPath = 'M' + [pos.x, pos.y].join(',') // M5,5
  let side = -1
  const numSteps = Math.round(pathLen / waveLength)

  for (let i = 1; i <= numSteps; i++) {
    const last = pos
    pos = isFirefox ? fakeSlavePathEl.getPointAtLength(i * pathLen / numSteps) : slavePathEl.getPointAtLength(i * pathLen / numSteps)

    // Find a point halfway between last and pos. Then find the point that is
    // perpendicular to that line segment, and is amplitude away from
    // it on the side of the line designated by 'side' (-1 or +1).
    // This point will be the control point of the quadratic curve forming the
    // squiggle step.

    // The vector from the last point to this one
    const vector = {
      x: (pos.x - last.x),
      y: (pos.y - last.y),
    }

    // The length of this vector
    const vectorLen = Math.sqrt(vector.x * vector.x + vector.y * vector.y)

    // The point halfway between last point and this one
    const half = {
      x: (last.x + vector.x / 2),
      y: (last.y + vector.y / 2)
    }

    // The vector that is perpendicular to 'vector'
    const perpVector = {
      x: -(amplitude * vector.y / vectorLen),
      y: (amplitude * vector.x / vectorLen)
    }

    // Now calculate the control point position
    const controlPoint = {
      x: (half.x + perpVector.x * side),
      y: (half.y + perpVector.y * side),
    }
    newPath += ('Q' + [controlPoint.x, controlPoint.y, pos.x, pos.y].join(','))

    // Switch the side (for next step)
    side = -side
  }
  return newPath
}

export default fabric.util.createClass(fabric.Path, {
  type: 'SquiggleyLine',

  // this weirdly looks a lot like React
  initialize: function (path, options) {
    this.options = options
    this.callSuper('initialize', path, options)
  },

  _render: function (ctx) {
    let stringifiedSvgPath = this.path.toString()

    stringifiedSvgPath = stringifiedSvgPath.replace(/M,/g, 'M').replace(/Q,/g, 'Q')

    const squiggledSvgPath = makeSquiggle(stringifiedSvgPath)

    ctx.strokeStyle = this.options.stroke
    ctx.lineWidth = this.options.strokeWidth
    ctx.beginPath()
    draw(ctx, squiggledSvgPath) // replaces new Path2D
    ctx.stroke()
    ctx.closePath()

    // this.callSuper('render', ctx) // this does the normal line. we don't want that
  },
})
