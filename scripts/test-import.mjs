try {
  const mod = await import('../src/actions/ride-requests.js')
  console.log('exports:', Object.keys(mod))
} catch (e) {
  console.error('import failed:', e && e.message)
  console.error(e && e.stack)
}
