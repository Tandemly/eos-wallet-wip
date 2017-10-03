import React, { Component } from "react";
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";
import App from "../App";
import configureStore from "./configureStore";

class Bootloader extends Component {
  state = {
    store: null
  };

  async componentWillMount() {
    const store = await configureStore();
    this.setState({ store });
  }

  render() {
    const { history } = this.props;
    const { store } = this.state;

    if (!store) {
      const styles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
        minHeight: "100vh"
      };

      return (
        <div style={styles}>
          <div>
            <img alt="" className="logo" src="images/logo.svg" />
          </div>

          <h2>Loading EOS Wallet App</h2>
        </div>
      );
    }

    return (
      <Provider store={store}>
        <div>
          <Router history={history}>
            <Route component={App} />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default Bootloader;
