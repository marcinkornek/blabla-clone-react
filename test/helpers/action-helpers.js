function itReturnsValidType(actionCreator, expectedType) {
  test('returns valid action type', () => {
    const action = typeof actionCreator === 'function' ? actionCreator() : actionCreator
    expect(action.type || (action && action.types && action.types[0])).toBeDefined()
  })
}

function itReturnsValidObject(fn) {
  test('returns valid object', () => {
    const res = typeof fn === 'function' ? fn() : fn
    expect(typeof res).toBe('object')
  })
}

module.exports = { itReturnsValidType, itReturnsValidObject }
