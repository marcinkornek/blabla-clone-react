// CommonJS wrapper to load ES module action creators
// Export a function that returns the ES module via dynamic import
module.exports.getActions = function() {
  return import('../../src/actions/ride-requests.js')
}

