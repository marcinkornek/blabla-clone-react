export function itIsAsyncAction (action, types) {
  it('returns types to be consumed by redux axios middleware', () => {
    expect(action).to.contain.all.keys(['types', 'payload'])
    expect(action.types).to.eql(types)
  })
}

export function itCallsApi (action, opts = {}) {
  it('returns a request function that fires off a redux axios middleware request when called', () => {
    const { payload: { request } } = action

    expect(request).to.be.a.object
    expect(request).to.eql(opts)
  })
}
