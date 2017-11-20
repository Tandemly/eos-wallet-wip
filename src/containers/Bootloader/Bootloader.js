import React, { Component } from "react";
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";
import App from "containers/App";
import Loading from "containers/Loading";
import { configureStoreAsync } from "util/configureStore";
import { apiRequest } from "util/fetchUtil";
import { unsetNotification } from "../../redux-modules/notifications/actions";
import APIClient from "../../util/apiClient";

const txn = {
  code: "eos",
  type: "transfer",
  authorization: [{ account: "inita", permission: "active" }],
  data: {
    from: "inita",
    to: "initb",
    amount: 100,
    memo: "memo"
  }
};

class Bootloader extends Component {
  state = {
    store: null
  };

  async componentWillMount() {
    const { history } = this.props;
    const store = await configureStoreAsync(history);

    this.setState({ store });

    // quick check for API access + connectivity
    apiRequest("/v1/status")
      .then(resp => console.log(`=> API connection: ${resp.message}`))
      .catch(resp => console.log(`=> API connection: ${resp}`));

    // quick check on api client (inita private key)
    const api = new APIClient({
      keyProvider: ["5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"]
    });
    api
      .get("/v1/status")
      .then(resp => console.log(`=> api client status: ${resp}`));
    api
      .post("/v1/transactions", {
        scope: ["inita", "initb"],
        messages: [txn]
      })
      .then(resp => {
        console.log(`=> api post: ${JSON.stringify(resp, null, 2)}`);
      });
  }

  render() {
    const { history } = this.props;
    const { store } = this.state;

    if (!store) {
      return <Loading />;
    } else {
      // Clear notifications...not completely sure about this
      store.dispatch(unsetNotification());
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
