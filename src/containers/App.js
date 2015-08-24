import React          from 'react';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import HashHistory    from 'react-router/lib/HashHistory';
import { Router }     from 'react-router';
import { Provider }   from 'react-redux';
import storage        from '../store/storage';
import { createRoutes }   from './routes';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';


const store = storage();
const routes = createRoutes(store);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.history = new BrowserHistory();
  }

  render() {
    return (
      <div>
        <Provider store={store}>{ () =>
          <Router history={this.history} children={routes} /> }
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store}
                    monitor={LogMonitor} />
        </DebugPanel>
      </div>
    )
  }
}
