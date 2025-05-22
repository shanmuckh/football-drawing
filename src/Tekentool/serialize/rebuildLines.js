// fabric isn't great. it has a bug where quadratic curves cannot be serialized
// https://stackoverflow.com/q/49047432/2255980
// so instead of trying to restore a curvey line, instead we restore the control points
// and then re-bind event listeners to them, and then re-draw the line

// @flow
// import canvas from '../initialise'

import calcArrowAngle from '../lines/calcArrowAngle'
import makePathLine from '../lines/makePathLine'
import makeCurveEnd from '../lines/makeCurveEnd'
import makeCurvePoint from '../lines/makeCurvePoint'
import makeArrowHead from '../lines/makeArrowHead'

export default (lineGroups: [], canvas, isDisplayOnly: bool) => {
  // restart
  let itemCount = 1

  if (!isDisplayOnly) {
    // trash this shit, we will rebuild it all
    canvas.getItemsByName('pointStart').forEach(item => canvas.remove(item))
    canvas.getItemsByName('pointCurve').forEach(item => canvas.remove(item))
    canvas.getItemsByName('pointEnd').forEach(item => canvas.remove(item))
  }

  lineGroups.forEach(lineGroup => {
    // first up, get the top+left of all 3 path coordinates (start, curve, end)
    const path01 = lineGroup.pointStart.left
    const path02 = lineGroup.pointStart.top
    const path11 = lineGroup.pointCurve.left
    const path12 = lineGroup.pointCurve.top
    const path13 = lineGroup.pointEnd.left
    const path14 = lineGroup.pointEnd.top

    // regenerate the arrow head
    const angle = calcArrowAngle(path11, path12, path13, path14)
    const arrowHead = makeArrowHead(path13, path14, angle)

    if (isDisplayOnly) {
      const pathLine = makePathLine(lineGroup.pointStart.variation)
      pathLine.set({
        path: [
          ['M', path01, path02],
          ['Q', path11, path12, path13, path14]
        ]
      })
      canvas.add(arrowHead)
      canvas.add(pathLine)
      return
    }

    // regenerate those 3 points as fabric elements
    const pointStart = makeCurveEnd(path01, path02)
    const pointCurve = makeCurvePoint(path11, path12)
    const pointEnd = makeCurveEnd(path13, path14)

    // ids are used to keep track of which point coordinates belong to which pathLine
    pointStart.id = itemCount
    pointCurve.id = itemCount
    pointEnd.id = itemCount
    itemCount++

    // naming each point helps us identify it later
    pointStart.name = 'pointStart'
    pointCurve.name = 'pointCurve'
    pointEnd.name = 'pointEnd'

    pointStart.variation = lineGroup.pointStart.variation
    pointCurve.variation = lineGroup.pointCurve.variation
    pointEnd.variation = lineGroup.pointEnd.variation

    // now we create a fabric instance of the pathline
    // pass in the type of line that should be rebuilt
    //
    const pathLine = makePathLine(lineGroup.pointStart.variation)

    // and start binding everything together
    pointStart.pathLine = pathLine
    pointStart.arrowHead = arrowHead
    pointStart.pointCurve = pointCurve
    pointStart.pointEnd = pointEnd

    pointCurve.pathLine = pathLine
    pointCurve.arrowHead = arrowHead
    pointCurve.pointStart = pointStart
    pointCurve.pointEnd = pointEnd

    pointEnd.pathLine = pathLine
    pointEnd.arrowHead = arrowHead
    pointEnd.pointStart = pointStart
    pointEnd.pointCurve = pointCurve

    // and finally draw the line
    pathLine.set({
      path: [
        ['M', path01, path02],
        ['Q', path11, path12, path13, path14]
      ]
    })

    // and add all of it into the fabric canvas
    canvas.add(arrowHead)
    canvas.add(pointCurve)
    canvas.add(pointStart)
    canvas.add(pointEnd)
    canvas.add(pathLine)
  })
}
