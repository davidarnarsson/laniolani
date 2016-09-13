import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import rootReducer, { LendersDefaultState, MonthDefaultState, ResultsDefaultState } from './reducers';
import App from 'components/App';

const THEMUTHAFUCKENSTATEBISH = localStorage.getItem('ze-state') != null ? JSON.parse(localStorage.getItem('ze-state')) : undefined;

const store = createStore(rootReducer, THEMUTHAFUCKENSTATEBISH, applyMiddleware(thunk));

store.subscribe(() => {
  let state = store.getState()
  localStorage.setItem('ze-state', JSON.stringify(state))
});

if (module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default);
  });
  module.hot.accept();

  module.hot.dispose((data) => {
    data.counter = store.getState();
    [].slice.apply(document.querySelector('#app').children).forEach(function(c) { c.remove() });
  });
}

const load = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#app')
  );
};

if (document.readyState !== 'complete') {
  document.addEventListener('DOMContentLoaded', load);
} else {
  load();
}
