['.css', '.scss', '.png', '.jpg', '.gif', '.svg'].map((e) => {
  require.extensions[e] = () => {}
})
