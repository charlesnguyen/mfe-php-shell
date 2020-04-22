import React from 'react';
import ReactDOM from 'react-dom';
import * as singleSpa from "single-spa";
import * as isActive from "./activityFns.js";
import { Router, Link } from "react-router-dom";
import history from "./history";
import { Provider } from "react-redux";
import {  compose } from "redux";
import configureStore from "./reducer";

window.SystemJS = window.System;
const availableApps = [
    {
      name: "aisp",
      path: "http://localhost:8236/aisp.js",
      link: "/apps/aisp"
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
const enhancer = composeEnhancers();
export const store = configureStore(enhancer);

const App = () => {
        return (
            <div className="column">
                {availableApps.map(
                    ({ name, link }, index) => (
                        <div key={`app_${index}`}><Link to={link} className="btn btn-link">{name}</Link></div>
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
      { store }
    )
  );
  
  singleSpa.start();