import React, { Component } from 'react'
import addItem from '../../modifiers/addItem'
import addShirt from '../../modifiers/addShirt'

import './Main.scss'

let transitionTimeout // this is just a timeout placeholder
let draggedAsset // this is not really react-y. normally should be in state, but we modify the dom directly in this component

class Main extends Component {
  state = {
    isDragging: false,
  }

  onDrop = ({ e }) => {
    e.preventDefault()
    const iconType = this.props.iconType
    const { x: left, y: top } = this.props.canvas.getPointer(e)
    const { variation, color, src, width, height, defaultIcon, alternateIcon } = draggedAsset.dataset
    const canvas = this.props.canvas

    if (variation.includes('shirt')) {
      addShirt({ left, top, variation, color, canvas, src, width, height, defaultIcon, alternateIcon, iconType })
    } else {
      addItem({ left, top, variation, color, canvas, src, width, height, defaultIcon, alternateIcon, iconType })
    }
  }

  transitionBack = () => {
    if (!draggedAsset.draggable) return
    clearTimeout(transitionTimeout) // this prevents a bug when you rapidly tap on an image
    this.setState({
      draggedAsset: {},
      isDragging: false,
    })

    setTimeout(() => draggedAsset.children[0].classList.remove('Controls_Img--active'), 1)
    transitionTimeout = setTimeout(() => {
      draggedAsset.children[0].style.left = ''
      draggedAsset.children[0].style.top = ''
      draggedAsset.children[0].classList.remove('Controls_Img--base')
    }, 150)
  }

  componentWillMount() { clearTimeout(transitionTimeout) }

  handleDown = e => {
    // check for the 'draggable' attribute
    if (!e.target.draggable) return
    this.setState({ isDragging: true })

    draggedAsset = e.target
    draggedAsset.children[0].classList.add('Controls_Img--base')

    const pageX = e.touches ? e.touches[0].pageX : e.pageX
    const pageY = e.touches ? e.touches[0].pageY : e.pageY

    const width = draggedAsset.offsetWidth * 0.5
    const height = draggedAsset.offsetHeight * 0.5

    draggedAsset.children[0].style.left = `${pageX - width}px`
    draggedAsset.children[0].style.top = `${pageY - height}px`

    // this needs a tiny timeout so that the css transition has time to kick in
    setTimeout(() => draggedAsset.children[0].classList.add('Controls_Img--active'), 0)
  }

  handleMove = e => {
    if (!this.state.isDragging) return
    if (!draggedAsset.draggable) return
    e.preventDefault()

    const pageX = e.touches ? e.touches[0].pageX : e.pageX
    const pageY = e.touches ? e.touches[0].pageY : e.pageY

    const width = draggedAsset.offsetWidth * 0.5
    const height = draggedAsset.offsetHeight * 0.5

    draggedAsset.children[0].style.left = `${pageX - width}px`
    draggedAsset.children[0].style.top = `${pageY - height}px`
  }

  handleEnd = e => {
    if (!this.state.isDragging) return
    if (!draggedAsset.draggable) return

    const pageX = e.changedTouches ? e.changedTouches[0].pageX : e.pageX
    const pageY = e.changedTouches ? e.changedTouches[0].pageY : e.pageY

    // need to measure width/height like so, seeing as css is used to make the canvas element responsive
    const bound = this.props.canvasEl.getBoundingClientRect()
    const { width, height, left, top } = bound

    if ((pageX > left) && (pageX < width + left) && (pageY > top) && (pageY < height + top)) {
      // this if statement ensures that the image was dropped on the canvas
      this.onDrop({ e })
    }
    this.transitionBack()
  }

  handleDragStart = e => e.preventDefault()

  render() {
    return (
      <main
        className="Main"
        // mouse handlers
        onMouseDown={this.handleDown}
        onMouseMove={this.handleMove}
        onMouseUp={this.handleEnd}
        onDragStart={this.handleDragStart}
        // touch handlers
        onTouchStart={this.handleDown}
        onTouchMove={this.handleMove}
        onTouchEnd={this.handleEnd}
      >
        {this.props.children}
      </main>
    )
  }
}

export default Main
