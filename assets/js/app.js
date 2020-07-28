import React, { useEffect} from 'react';
import ReactDOM from 'react-dom';
import * as singleSpa from "single-spa";
import { Provider, useDispatch } from "react-redux";
import { Router, Link } from "react-router-dom";
import appConfig from 'appConfig'; // retrieve data from PHP using webpack's externals => appConfig = window.appConfig
import createSagaMiddleware from 'redux-saga'
import {  compose, applyMiddleware } from "redux";

import * as isActive from "./activityFns.js";
import history from "./history";
import configureStore from "./reducer";
import {updateTokenAction} from "./config.reducer";

window.SystemJS = window.System;

// Fetch available apps for a user
const availableApps = [
    {
      name: "aisp",
      path: "http://localhost:8236/ais-pis.js",
      link: "/apps/accounts"
    },
    {
      name: "pisp",
      path: "http://localhost:8237/pisp.js",
      link: "/apps/pisp"
    }
  ]


const composeEnhancers =
typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const sagaMiddleware = createSagaMiddleware()
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
export const store = configureStore(enhancer);

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTokenAction(appConfig.token)); // update token
  },[]);

  return (
      <div className="row">
          {availableApps.map(
              ({ name, link }, index) => (
                  <div key={`app_${index}`}><Link to={link} className="nav-link">{name}</Link></div>
              )
          )}
      </div>
  );
    
}

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App availableApps={availableApps} />
      </Router>
    </Provider>,
  
    document.getElementById("nav")
  );
  
availableApps.forEach(app =>
  singleSpa.registerApplication(
    app.name,
    () => SystemJS.import(app.path),
    isActive[app.name],
    { store, sagaMiddleware}
  )
);

singleSpa.start();