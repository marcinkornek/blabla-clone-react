import React            from 'react';
import { history }      from 'react-router/lib/BrowserHistory';
import { Router }       from 'react-router';
import { Provider }     from 'react-redux';
import storage          from '../store/storage';
import { createRoutes } from './routes';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

const store = storage();
const routes = createRoutes(store);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var devTools
    if (__DEVELOPMENT__ && __DEVTOOLS__) {
      devTools =
        <DebugPanel top right bottom>
          <DevTools store={store}
                    monitor={LogMonitor} />
        </DebugPanel>
    }

    return (
      <div>
        <Provider store={store}>{ () =>
          <Router history={history} children={routes} /> }
        </Provider>
        {devTools}
      </div>
    )
  }
}
