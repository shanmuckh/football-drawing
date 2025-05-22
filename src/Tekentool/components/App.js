// @flow
import React, { Component } from 'react'

import store from '../store'

import { shirtTypes, goalTypes, coneTypes, itemTypes, fieldTypes } from '../assets/assets'
import { backgroundColor } from '../options'

import importJSON from '../serialize/importJSON'
import exportJSON from '../serialize/exportJSON'

import cursorSVG from '../assets/custom-cursor.svg'

// Components
import Canvas from './Canvas/Canvas'
import Main from './Main/Main'
import Aside from './Aside/Aside'
import Items from './Sections/Items'
import Lines from './Sections/Lines'
import Fields from './Sections/Fields'
import Extras from './Sections/Extras'
import Editor from './Editor/Editor'

import initialiseCanvas from '../initialise'

import setField from '../modifiers/setField'
import handleCanvasIconToggle from '../modifiers/handleCanvasIconToggle'

import promisedSVGLoader from '../utils/promisedSVGLoader'
import exportToPng from '../utils/exportToPng'
class App extends Component {
  constructor(props) {
    super(props)

    this.canvasRef = React.createRef()

    this.state = {
      selection: null,
      fieldTypes: [],
      shirtTypes: [],
      goalTypes: [],
      itemTypes: [],
      coneTypes: [],
      fieldSelected: null,
      lineSelected: null,
      iconType: 'defaultIcon',
      showAside: false,
    }
  }

  loadItemImages = (iconType) => {
    let promiseArr = []

    const pushPromises = (type: Object) => {
      const variation = type.variation
      const color = type.color
      const src = type[iconType]
      // if the svg data has already been generated use it
      // otherwise we'd be generating new SVG data each time the checkbox toggle is clicked
      if (type[`svg-${iconType}`]) {
        promiseArr.push(type[`svg-${iconType}`])
        return
      }
      // generate new svg data. this task is async which is why we create an array of promises
      promiseArr.push(promisedSVGLoader({ src, color, variation, iconType }))
    }

    shirtTypes.forEach(type => pushPromises(type))
    goalTypes.forEach(type => pushPromises(type))
    itemTypes.forEach(type => pushPromises(type))
    coneTypes.forEach(type => pushPromises(type))
    fieldTypes.forEach(type => pushPromises(type))

    Promise.all(promiseArr).then(results => {
      const spreadArr = [...shirtTypes, ...goalTypes, ...itemTypes, ...coneTypes, ...fieldTypes]

      spreadArr.forEach((type: any, i: number) => {
        const svg = results[i]
        type[`svg-${iconType}`] = svg
      })

      this.setState({ shirtTypes, goalTypes, itemTypes, coneTypes, fieldTypes })
    })
  }

  componentDidMount() {
    this.canvas = initialiseCanvas(this.canvasRef.current)

    if (this.props.options.JSON) {
      this.preloadJSON()
    } else {
      this.loadItemImages(this.state.iconType)
      this.canvas.requestRenderAll()
    }
  }

  preloadJSON = () => {
    const preloadJSON = this.props.options.JSON
    const preloadIconType = preloadJSON.iconType

    this.loadItemImages(preloadIconType)

    if (preloadJSON.objects) {
      this.setState({
        iconType: preloadIconType || 'defaultIcon' // just in case
      })

      importJSON(preloadJSON, this.canvas, false, this.state.iconType)
    } else {
      // eslint-disable-next-line
        console.error('Supplied JSON is invalid.')
    }
  }

  setLineType = e => {
    const lineSelected = e.target.dataset.variation

    if (lineSelected === this.state.lineSelected) {
      store.lineType = ''
      this.canvas.defaultCursor = ''
      this.setState({ lineSelected: null })
    } else {
      store.lineType = lineSelected
      this.canvas.defaultCursor = `url(${cursorSVG}), auto`
      this.setState({ lineSelected })
    }
  }

  handleClearCanvas = () => {
    store.clearCanvas()
    this.canvas.clear()
    this.canvas.set('backgroundColor', backgroundColor)
  }

  handleCheckboxChange = e => {
    const newIconType = this.state.iconType === 'defaultIcon' ? 'alternateIcon' : 'defaultIcon'
    handleCanvasIconToggle(this.canvas, newIconType)
    this.loadItemImages(newIconType)

    this.setState({
      iconType: newIconType
    })
  }

  handleSerialize = () => exportJSON(this.canvas, false, this.state.iconType)

  handleImportJSON = () => importJSON(window.prompt() || {}, this.canvas, false, this.state.iconType)

  setField = e => setField({
    e,
    canvas: this.canvas,
    state: this.state,
    setState: state => this.setState(state)
  })

  handleExportPNG = () => exportToPng(this.canvas)

  render() {
    return (
      <div className="App-container">

        <Main
          canvas={this.canvas}
          canvasEl={this.canvasRef.current}
          iconType={this.state.iconType}
        >

          <Aside
            showAside={this.state.showAside}
            handleShowAside={() => this.setState({ showAside: false })}
          >
            <Items
              goalTypes={this.state.goalTypes}
              itemTypes={this.state.itemTypes}
              coneTypes={this.state.coneTypes}
              shirtTypes={this.state.shirtTypes}
              iconType={this.state.iconType}
              isDragging={this.state.isDragging}
            />
            <Lines
              setLineType={this.setLineType}
              lineSelected={this.state.lineSelected}
            />
            <Fields
              setField={this.setField}
              fieldTypes={this.state.fieldTypes}
              fieldSelected={this.state.fieldSelected}
              iconType={this.state.iconType}
            />
            <Extras
              onCheckboxChange={this.handleCheckboxChange}
              exportPNG={this.handleExportPNG}
              clearCanvas={this.handleClearCanvas}
              destroy={this.props.handleDestroy}
              serialize={this.handleSerialize}
              importJSON={this.handleImportJSON}
              iconType={this.state.iconType}
            />

          </Aside>

          <div className="Canvas Canvas-isEditorMode">
            <Canvas
              canvas={this.canvas}
              canvasEl={this.canvasRef.current}
              iconType={this.state.iconType}
              setState={state => this.setState(state)} // this allows the child component (Canvas) to update state in its parent (App)
            >
              <canvas id="canvas" ref={this.canvasRef} />
            </Canvas>
            <Editor
              selection={this.state.selection}
              canvas={this.canvas}
              iconType={this.state.iconType}
            />
          </div>

        </Main>

        <button className="Aside_Toggle" onClick={() => this.setState({ showAside: !this.state.showAside })}>
          +
          <span className="u-visuallyhidden">Toggle Controls</span>
        </button>
      </div>
    )
  }
}

export default App
