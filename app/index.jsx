import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history'

import createStore from './store';

import App from './components/app';

const history = createHistory();
const store = createStore(history);

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
