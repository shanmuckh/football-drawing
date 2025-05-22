import React, { Component } from 'react'
import importJSON from '../serialize/importJSON'
import initialiseCanvas from '../initialise'

class App extends Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    this.canvas = initialiseCanvas(this.canvasRef.current, true)

    const iconType = this.props.alternateIcons ? 'alternateIcon' : 'defaultIcon'

    if (this.props.options.JSON) {
      const preloadJSON = this.props.options.JSON

      if (preloadJSON.objects) {
        importJSON(preloadJSON, this.canvas, true, iconType)
      } else {
        // eslint-disable-next-line
        console.error('Supplied JSON is invalid.')
      }
    } else {
      this.canvas.requestRenderAll()
    }
  }

  render() {
    return (
      <canvas className="Canvas Canvas-isDisplayMode" ref={this.canvasRef} />
    )
  }
}

export default App
