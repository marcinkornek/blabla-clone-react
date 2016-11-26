export function itReturnsValidType (action, type) {
  it('returns valid type', () => {
    expect(action).to.contain.all.keys(['type'])
    expect(action.type).to.eql(type)
  })
}

export function itReturnsValidObject (action, objectName, object) {
  it('returns object with valid data', () => {
    expect(action).to.contain.all.keys([objectName])
    expect(action[objectName]).to.eql(object)
  })
}
