import React          from 'react'
import BrowserHistory from 'react-router/lib/BrowserHistory'
import HashHistory    from 'react-router/lib/HashHistory'
import { Router }     from 'react-router'
import { Provider }   from 'react-redux'
import storage        from '../store/storage'
import routes         from './routes'

const history = process.env.NODE_ENV === 'production' ?
  new HashHistory() :
  new BrowserHistory()

var store = storage()

React.render(
	<Provider store = { store }>
	  { () => <Router history = {history} children={routes} /> }
	</Provider>
	, document.getElementById('root')
)
