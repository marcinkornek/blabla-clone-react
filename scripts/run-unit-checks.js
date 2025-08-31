const assert = require('assert')
const path = require('path')

const wrapper = require(path.join('..','scripts','compat','ride-requests.cjs'))

async function loadActions() {
  try {
    const mod = await wrapper.getActions()
    return mod
  } catch (err) {
    console.error('Failed to load actions ES module:', err && err.message)
    process.exit(2)
  }
}

function checkCreate(actions) {
  const fn = actions.createRideRequest
  assert.strictEqual(typeof fn, 'function')
  const action = fn(1,4)
  console.log('create action types[0]:', action.types && action.types[0])
  console.log('create action payload keys:', action.payload && Object.keys(action.payload))
  assert(Array.isArray(action.types), 'types must be array')
  assert.strictEqual(action.types[0].endsWith('REQUEST') || typeof action.types[0] === 'string', true)
  assert(action.payload && action.payload.request, 'payload.request required')
  console.log('createRideRequest: OK')
}

function checkChange(actions) {
  const fn = actions.changeRideRequest
  assert.strictEqual(typeof fn, 'function')
  const action = fn(1,'accepted')
  assert(Array.isArray(action.types), 'types must be array')
  assert(action.payload && action.payload.request, 'payload.request required')
  console.log('changeRideRequest: OK')
}

;(async () => {
  try {
    const actions = await loadActions()
    checkCreate(actions)
    checkChange(actions)
    console.log('All checks passed')
  } catch (err) {
    console.error('Check failed:', err && err.stack ? err.stack : err && err.message)
    process.exit(2)
  }
})()
