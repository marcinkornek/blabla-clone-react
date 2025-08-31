// Minimal helpers to assert redux-axios-middleware-style async actions
function itIsAsyncAction(action, expectedTypes) {
  test('is an async action (has types array)', () => {
    expect(action).toBeDefined()
    expect(Array.isArray(action.types)).toBe(true)
    expect(action.types).toEqual(expectedTypes)
  })
}

function itCallsApi(action, expectedOpts) {
  test('contains expected payload.request for API call', () => {
    expect(action.payload).toBeDefined()
    expect(action.payload.request).toBeDefined()
    const req = action.payload.request
    // check simple fields
    if (expectedOpts.method !== undefined) expect(req.method).toBe(expectedOpts.method)
    if (expectedOpts.url !== undefined) expect(req.url).toBe(expectedOpts.url)
    if (expectedOpts.data !== undefined) expect(req.data).toEqual(expectedOpts.data)
    if (expectedOpts.headers !== undefined) expect(req.headers).toEqual(expectedOpts.headers)
  })
}

module.exports = { itCallsApi, itIsAsyncAction }
