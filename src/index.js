// @flow
import React from "react";
import ReactDOM from "react-dom";
import createHistory from "history/createBrowserHistory";
import Bootloader from "containers/Bootloader";
import registerServiceWorker from "./app/registerServiceWorker";

import "styles/index.scss";

const styles = [...document.querySelectorAll('head style')];
const link = document.querySelector('link[type="text/css"]');

styles.forEach(style => link.parentElement.insertBefore(style, link));

const history = createHistory();

ReactDOM.render(
  <Bootloader history={history} />,
  document.getElementById("root")
);
registerServiceWorker();
