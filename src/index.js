// @flow
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory as createHistory } from "history";
import Bootloader from "./containers/Bootloader";
import registerServiceWorker from "./registerServiceWorker";

import "./styles/index.scss";

const styles = [...document.querySelectorAll("head style")];
const link = document.querySelector('link[type="text/css"]');

styles.forEach(
  style =>
    link && link.parentElement && link.parentElement.insertBefore(style, link)
);

const history = createHistory();

function getElement(id: string): Element {
  return ((document.getElementById(id): any): Element); // type cast
}

ReactDOM.render(<Bootloader history={history} />, getElement("root"));
registerServiceWorker();
