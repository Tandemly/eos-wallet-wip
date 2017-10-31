import * as React from "react";
import { Router, Route } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

class DisplayReactRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route component={() => this.props.children} />
      </Router>
    );
  }
}

export default DisplayReactRouter;
