/*!
  * Tekentool
  * Football strategy drawing tool
  *
  */

// add polyfills
import './polyfills/arrayFrom'
import './polyfills/stringIncludes'

// add fabric prototypes and options
import './utils/addFabricPrototypes'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import AppDisplayOnly from './components/AppDisplayOnly'

import './styles/index.scss'

const getQueryElement = function (elem) {
  if (typeof elem === 'string') {
    return document.querySelector(elem)
  }
  return elem
}

const destroy = function () {
  delete this.appEl.TekentoolGUID
  delete instances[this.guid]
  ReactDOM.unmountComponentAtNode(this.appEl)
}

// globally unique identifiers
let instance
// internal store of all Tekentool intances
let GUID = 0
let instances = {}

function Tekentool(elApp, options) {
  const queryElement = getQueryElement(elApp)
  if (!queryElement) {
    /* eslint-disable */
    console.error('Bad element for Tekentool: ' + (queryElement || elApp))
    return
  }
  this.appEl = queryElement

  // do not initialize twice on same element
  if (this.appEl.TekentoolGUID) {
    instance = instances[this.appEl.TekentoolGUID]
    console.error('Already initialised: ' + (this.appEl || elApp))
    return instance
  }

  // options
  this.options = {
    ...this.constructor.defaults,
    ...options,
  }

  this.destroy = destroy.bind(this)

  // kick things off
  // add id for Tekentool.data
  var id = this.guid = ++GUID
  this.appEl.TekentoolGUID = id // expando
  instances[id] = this // associate via id

  ReactDOM.render(
    this.options.displayOnly ? (
      <AppDisplayOnly
        options={options}
      />
    ) : (
      <App
        appEl={this.appEl}
        options={options}
        handleDestroy={this.destroy}
      />
    ), queryElement
  )
}

Tekentool.defaults = {
  // hi: 'hooo'
}

// TODO: just for development
const myTekenToolInstance = new Tekentool('.hook1', {
  //JSON: test,
  displayOnly: false,
})

export default Tekentool // to the user api
