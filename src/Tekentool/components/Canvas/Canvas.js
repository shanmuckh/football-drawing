import { Component } from 'react'
import store from '../../store'
import { highlightStyle, emptyStyle, hoverScale } from '../../options'

import calcArrowAngle from '../../lines/calcArrowAngle'
import makePathLine from '../../lines/makePathLine'
import makeCurveEnd from '../../lines/makeCurveEnd'
import makeCurvePoint from '../../lines/makeCurvePoint'
import makeArrowHead from '../../lines/makeArrowHead'

import removeActiveItem from '../Editor/removeActiveItem'
import toggleLineControlVisibility from '../../modifiers/toggleLineControlVisibility'
import animateScale from '../../modifiers/animateScale'

let lineCount = 1

let isMouseDown = false
let isDrawingNewLine = false

class Canvas extends Component {
  pathLine = null
  startX = 0
  startY = 0

   getTargetElement = selection => selection.getObjects()[0].getObjects().find(x => x.id === 'js-main-color')

   setHighlight = selection => {
     const variation = selection.variation
     if (variation.includes('line')) {
       selection.set({ fill: '#fff' })
       return
     }
     if (this.props.iconType === 'defaultIcon') {
       const target = this.getTargetElement(selection)

       if (target) {
         target.set(highlightStyle)
       }
     } else {
       // console.log('TODO: select styles for alternate icons')
     }
   }
   removeHighlight = selection => {
     const variation = selection.variation
     if (variation.includes('line')) {
       selection.set({ fill: 'transparent' })
       return
     }

     if (this.props.iconType === 'defaultIcon') {
       const target = this.getTargetElement(selection)
       if (target) target.set(emptyStyle)
     } else {
       // console.log('TODO: select styles for alternate icons')
     }
   }

   onSelectionCleared = e => {
     const activeObj = (e && e.deselected[0]) || this.props.canvas.getActiveObject()

     if (activeObj) {
       this.props.setState({ selection: null })
       this.props.canvas.discardActiveObject()
       this.props.canvas.requestRenderAll()
       this.removeHighlight(activeObj)
     }
   }

  onSelectionUpdated = e => {
    const selection = e.selected[0]
    this.removeHighlight(e.deselected[0])
    this.setHighlight(selection)
    this.props.setState({ selection })
    this.props.canvas.requestRenderAll()
  }

  onSelectionCreated = e => {
    const selection = e.selected[0]
    // store.selection = selection
    this.setHighlight(selection)
    this.props.setState({ selection })
    this.props.canvas.requestRenderAll()
  }

  onMouseOver = e => {
    toggleLineControlVisibility({ show: true, canvas: this.props.canvas })
    if (!e.target) return
    if (e.target && e.target.variation === 'field-text') return
    animateScale(e.target, hoverScale, this.props.canvas)
  }

  onMouseOut = e => {
    if (!e.target) {
      // when mouse leaves the canvas, remove active styles from all line point controls
      toggleLineControlVisibility({ show: false, canvas: this.props.canvas })
      return
    }
    if (e.target && e.target.variation === 'field-text') return
    animateScale(e.target, 1, this.props.canvas)
  }

  onMouseDown = e => {
    if (e.target && e.target.variation === 'field-text') return
    if (e.target) animateScale(e.target, 1, this.props.canvas) // on mousedown return to regular scale, because otherwise it's hard to position objects accurately
    if (!store.lineType.length) return // don't draw a line unless a line type is selected
    isMouseDown = true

    // check to make sure were not dragging an existing item
    if (!e.target) {
      toggleLineControlVisibility({ show: true, canvas: this.props.canvas })
      const { x, y } = this.props.canvas.getPointer(e.e)
      // we are drawing a new line
      isDrawingNewLine = true
      this.startX = x
      this.startY = y

      this.pathLine = makePathLine()
      this.props.canvas.add(this.pathLine)
    }
  }

   onMouseMove = e => {
     if (!isMouseDown) return
     if (!isDrawingNewLine) return

     // this is now the sole act of drawing a new line.
     const { x, y } = this.props.canvas.getPointer(e.e)

     // work out the mid point between start and end
     // this is where we drop the curve controller
     const midPointX = (this.startX + x) * 0.5
     const midPointY = (this.startY + y) * 0.5

     this.pathLine.set({
       path: [
         ['M', this.startX, this.startY],
         ['Q', midPointX, midPointY, x, y]
       ]
     })

     this.props.canvas.requestRenderAll()
   }

   onMouseUp = e => {
     if (e.target && e.target.variation === 'field-text') return
     if (e.target) animateScale(e.target, hoverScale, this.props.canvas) // mouse up return to hover scale
     isMouseDown = false

     const { x, y }: { x: number, y: number } = this.props.canvas.getPointer(e.e)

     // TODO: maybe add some kind of threshold?
     // the mouse didn't drag, it just clicked, so dont do anything further
     if (x === this.startX && y === this.startY) {
       isDrawingNewLine = false
       return
     }

     // make sure that
     // a) were not just clicking an object
     // b) we're not mousing up on an object after a line drag
     if (isDrawingNewLine) {
       isDrawingNewLine = false

       // ok now we add the control points and the arrow for the line which was just drawn.
       const midPointX = (this.startX + x) * 0.5
       const midPointY = (this.startY + y) * 0.5

       const angle = calcArrowAngle(midPointX, midPointY, x, y)
       const pointStart = makeCurveEnd(this.startX, this.startY)
       const pointCurve = makeCurvePoint(midPointX, midPointY)
       const pointEnd = makeCurveEnd(x, y)
       const arrowHead = makeArrowHead(x, y, angle)

       pointStart.id = lineCount
       pointCurve.id = lineCount
       pointEnd.id = lineCount
       lineCount++

       pointStart.name = 'pointStart'
       pointCurve.name = 'pointCurve'
       pointEnd.name = 'pointEnd'

       pointStart.variation = store.lineType
       pointCurve.variation = store.lineType
       pointEnd.variation = store.lineType

       // here we go through each point on the line, and create references to each other
       // we need this so that if the user attempts to delete a line later, they can just
       // click on any point, and hit delete, and it will delete every object that the line
       // comprises of
       pointStart.pathLine = this.pathLine
       pointStart.arrowHead = arrowHead
       pointStart.pointCurve = pointCurve
       pointStart.pointEnd = pointEnd

       pointCurve.pathLine = this.pathLine
       pointCurve.arrowHead = arrowHead
       pointCurve.pointStart = pointStart
       pointCurve.pointEnd = pointEnd

       pointEnd.pathLine = this.pathLine
       pointEnd.arrowHead = arrowHead
       pointEnd.pointStart = pointStart
       pointEnd.pointCurve = pointCurve

       this.props.canvas.add(arrowHead)
       this.props.canvas.add(pointStart)
       this.props.canvas.add(pointCurve)
       this.props.canvas.add(pointEnd)

       this.startX = 0
       this.startY = 0

       // set active the line which was just drawn
       // may as well set it as point end, but any of them would be fine
       this.props.canvas.setActiveObject(pointCurve)

       toggleLineControlVisibility({
         show: true,
         objects: [pointStart, pointCurve, pointEnd],
         canvas: this.props.canvas,
       })

       store.addItem = pointCurve
       store.lineType = '' // reset the lineType so we can't draw another line
       this.props.canvas.defaultCursor = '' // reset the custom cursor
       this.props.setState({ lineSelected: null })
       this.pathLine = {}
     } else {
       // make sure there's an object being dragged
       if (!e.target) return
       // if user drags an object off the canvas, remove it
       if (x > this.props.canvas.width || x < 0 || y > this.props.canvas.height || y < 0) removeActiveItem(this.props.canvas)
     }

     this.props.canvas.requestRenderAll()
   }

  objectMoving = o => {
    const pathLineObjMov = o.target.pathLine
    if (!pathLineObjMov) return
    // from here on, we're only concerned with modifying an existing line
    const { x, y } = this.props.canvas.getPointer(o.e)

    const path01 = pathLineObjMov.path[0][1]
    const path02 = pathLineObjMov.path[0][2]
    const path11 = pathLineObjMov.path[1][1]
    const path12 = pathLineObjMov.path[1][2]
    const path13 = pathLineObjMov.path[1][3]
    const path14 = pathLineObjMov.path[1][4]

    if (o.target.name === 'pointStart') {
      pathLineObjMov.set({
        path: [
          ['M', x, y],
          ['Q', path11, path12, path13, path14]
        ]
      })
    }

    if (o.target.name === 'pointCurve') {
      pathLineObjMov.set({
        path: [
          ['M', path01, path02],
          ['Q', x, y, path13, path14]
        ]
      })
      o.target.arrowHead.set({ angle: calcArrowAngle(path11, path12, path13, path14) })
    }

    if (o.target.name === 'pointEnd') {
      pathLineObjMov.set({
        path: [
          ['M', path01, path02],
          ['Q', path11, path12, x, y]
        ]
      })
      o.target.arrowHead.set({
        left: x,
        top: y,
        angle: calcArrowAngle(path11, path12, path13, path14)
      })
    }

    this.props.canvas.renderAll()
  }

  adjustStackOrder = e => {
    const target = e.target
    if (!target.variation) return
    const isGoal = target.variation.includes('goal')
    if (isGoal) {
      // goals always start at the back (until they're rotated)
      target.sendToBack()
    } else {
      // this fixes a bug where if the first item dropped is a goal, then the second item dropped
      // will automatically go behind it
      if (this.props.canvas.getObjects().length) return
      // any other item should always get nudged backwards once, so they're behind
      // the top facing goal. yep this is confusing.
      target.sendBackwards()
    }
  }

  componentWillUnmount() {
    this.props.canvas.off({
      'selection:cleared': this.onSelectionCleared,
      'selection:updated': this.onSelectionUpdated,
      'selection:created': this.onSelectionCreated,
      'mouse:up': this.onMouseUp,
      'mouse:move': this.onMouseMove,
      'mouse:over': this.onMouseOver,
      'mouse:down': this.onMouseDown,
      'mouse:out': this.onMouseOut,
      'object:moving': this.objectMoving,
      'object:added': this.adjustStackOrder,
    })
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.canvas && this.props.canvas) {
      this.props.canvas.on({
        'selection:cleared': this.onSelectionCleared,
        'selection:updated': this.onSelectionUpdated,
        'selection:created': this.onSelectionCreated,
        'mouse:up': this.onMouseUp,
        'mouse:move': this.onMouseMove,
        'mouse:over': this.onMouseOver,
        'mouse:down': this.onMouseDown,
        'mouse:out': this.onMouseOut,
        'object:moving': this.objectMoving,
        'object:added': this.adjustStackOrder,
      })

      // TODO: here
      // handle document click to deselect the active element
      // const canvasContainerEl = (document.getElementsByClassName('canvas-container')[0]: HTMLElement)
      // const editorEl = (document.getElementById('js-editor'): HTMLElement | any)

      // const docClickHandler = (e: Event) => {
      //   const target = e.target
      //   if (target instanceof HTMLElement) {
      //     if (!canvasContainerEl.contains(target) && !editorEl.contains(target)) {
      //       onSelectionCleared() // TODO: make sure this fires only when somethings selected
      //     }
      //   }
      // }

      // document.addEventListener('click', docClickHandler)
      // document.addEventListener('touchstart', docClickHandler)
    }
  }

  render() {
    return (
      this.props.children
    )
  }
}

export default Canvas
