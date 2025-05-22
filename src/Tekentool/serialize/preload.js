// @flow
//import importJSON from './importJSON'
import isJSONString from '../utils/isJSONString'
const preloadEls = document.querySelectorAll('[data-preload]')

if (preloadEls.length && isJSONString(preloadEls[0].innerHTML)) {
  const preloadedData = JSON.parse(preloadEls[0].innerHTML)

  if (preloadedData.objects) {
    // importJSON(preloadedData)
  }
} else {
  // eslint-disable-next-line
  console.error('Preload JSON was invalid or not found. Check the element <script data-preload="XXX" type="application/json">')
}
