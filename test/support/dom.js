import jsdom from 'jsdom'
import sinon from 'sinon'

// setup the simplest document possible
global._baseURL = 'http://localhost:8080'

var doc = jsdom.jsdom('<!doctype html><html><body></body></html>', {
  url: global._baseURL
})

// get the window object out of the document
var win = doc.defaultView

// set globals for mocha that make access to document and window feel
// natural in the test environment
global.document = doc
global.window = win
global.window.addEventListener = sinon.spy(window, 'addEventListener')
global.window.removeEventListener = sinon.spy(window, 'removeEventListener')
global.__DEVELOPMENT__ = true;

// take all properties of the window object and also attach it to the
// mocha global object
propagateToGlobal(win)

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal (window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue
    if (key in global) continue

    global[key] = window[key]
  }
}
