import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import rootReducer from "./reducers/rootReducer";
import { setLocation } from './map/Geolocation'

import 'semantic-ui-css/semantic.min.css';
import './index.css';



const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

// setLocation(store)


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
