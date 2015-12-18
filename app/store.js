import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk  from 'redux-thunk';
import rootReducer from './reducers';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

export default function(history) {
  const reducer = combineReducers(Object.assign({}, rootReducer, {
    routing: routeReducer,
  }));

  const store = createStoreWithMiddleware(reducer);
  syncReduxAndRouter(history, store);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
