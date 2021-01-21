import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Route
          path={"/"}
          component={App}
        />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);