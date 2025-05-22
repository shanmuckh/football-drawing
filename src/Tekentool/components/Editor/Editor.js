import React, { Component } from 'react'

import './Editor.scss'

import translateCaption from './translateCaption'
import copyItem from './copyItem'
import removeActiveItem from './removeActiveItem'
import rotateItem from './rotateItem'

let selectedShirt: { getObjects: any } = {}

class Editor extends Component {
  state = {
    isVisible: false,
    variation: null,
    shirtInputVal: null,
  }

  componentDidUpdate(prevProps) {
    const selection = this.props.selection
    if (prevProps.selection === selection) return

    // handle no selection state
    if (!selection) {
      this.setState({ isVisible: false })
      selectedShirt = {}
      return
    }

    this.setState({ isVisible: true })

    selectedShirt = selection
    if (selection.variation.includes('shirt')) {
      this.setState({
        variation: 'shirt',
        shirtInputVal: selection.getObjects('text')[0].get('text')
      })
    }

    if (selection.variation.includes('goal')) this.setState({ variation: 'goal' })
    if (selection.variation.includes('line')) this.setState({ variation: 'line' })
    if (selection.variation.includes('ball')) this.setState({ variation: 'ball' })
    if (selection.variation.includes('cone')) this.setState({ variation: 'cone' })
    if (selection.variation.includes('witches-hat')) this.setState({ variation: 'witches-hat' })
  }

  handleInputChange = (e: Event) => {
    const target = e.target

    this.setState({ shirtInputVal: target.value })

    // The shirt is a group. Get the text element from within the group,
    // then set the text value to whatever has been typed in the input
    selectedShirt.getObjects('text')[0].set('text', target.value)
    this.props.canvas.requestRenderAll()
  }

  handleRotate = () => rotateItem(this.props.canvas)
  handleCopy = () => copyItem(this.props.canvas, this.props.iconType)
  handleRemove = () => removeActiveItem(this.props.canvas)

  render() {
    const variationCaption = this.props.selection ? this.props.selection.variation : ''

    return (
      <div className={`Editor${this.state.isVisible ? ' Editor--visible' : ''}`}>
        <span className="Editor_Caption">{translateCaption(variationCaption)}</span>
        {this.state.variation === 'shirt' &&
          <div className="Editor_Input-wrapper">
            <span className="Editor_Input-name">Shirt number</span>

            <input type="text" className="Editor_Input" maxLength="2" onChange={this.handleInputChange} value={this.state.shirtInputVal} />
          </div>
        }
        {this.state.variation === 'goal' &&
          <button onClick={this.handleRotate} className="Button--Editor">
            Rotate
            <svg className="Editor_Icon" xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" version="1.1">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-1107, -745)" fill="currentColor">
                  <g transform="translate(165, 95)">
                    <g transform="translate(495, 0)">
                      <g transform="translate(0, 621)">
                        <g transform="translate(376, 13)">
                          <path d="M81 24C81 26.2 79.2 28 77 28 74.8 28 73 26.2 73 24 73 21.8 74.8 20 77 20L77 22 81 19 77 16 77 18C73.7 18 71 20.7 71 24 71 27.3 73.7 30 77 30 80.3 30 83 27.3 83 24L81 24Z"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </button>
        }
        {this.state.variation !== 'line' &&
        // lines do not get a copy button, everything else does
          <button onClick={this.handleCopy} className="Button--Editor">
            Copy
            <svg className="Editor_Icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" version="1.1">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-1113, -753)" fill="currentColor">
                  <g transform="translate(165, 95)">
                    <g transform="translate(495, 0)">
                      <g transform="translate(0, 621)">
                        <g transform="translate(453, 37)">
                          <path d="M0 14L10 14 10 4 0 4 0 14ZM2 12L8 12 8 6 2 6 2 12Z" />
                          <polygon points="4 0 4 3 6 3 6 2 12 2 12 8 11 8 11 10 14 10 14 0" />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </button>
        }
        <button onClick={this.handleRemove} className="Button--Editor">
          Delete
          <svg className="Editor_Icon" xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" version="1.1">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g transform="translate(-1237, -746)" fill="#F36C21" fillRule="nonzero">
                <g transform="translate(1147, 729)">
                  <path fill="currentColor" d="M97 18L97 17 93 17 93 18 90 18 90 20 91 20 91 28 99 28 99 20 100 20 100 18 97 18ZM94 26L93 26 93 20 94 20 94 26ZM97 26L96 26 96 20 97 20 97 26Z"
                  />
                </g>
              </g>
            </g>
          </svg>
        </button>
      </div>
    )
  }
}

export default Editor
