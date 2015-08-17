export default function loggerMiddleware ({ getState }) {
  return next => action => {
    console.log('log action', action)
    console.log('log state', getState())
    next(action)
  }
}
