import * as React from "react";
import { Provider } from "react-redux";
import { configureStore } from "util/configureStore";

const store = configureStore();

class DisplayRedux extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    );
  }
}

export default DisplayRedux;
