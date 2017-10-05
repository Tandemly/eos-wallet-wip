// @flow
import React from "react";
import ReactDOM from "react-dom";
import createHistory from "history/createBrowserHistory";
import Bootloader from "./containers/Bootloader";
import registerServiceWorker from "./registerServiceWorker";

import "./styles/index.scss";

const history = createHistory();

ReactDOM.render(
  <Bootloader history={history} />,
  document.getElementById("root")
);
registerServiceWorker();
