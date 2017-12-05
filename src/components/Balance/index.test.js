import * as React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import { configureStore } from "util/configureStore";
import { CurrentEOSBalance } from "./";

describe("<CurrentEOSBalance /> container", () => {
  it("renders without crashing", () => {
    const { store } = configureStore({
      user: {
        profile: {
          account_name: "inita"
        }
      }
    });
    const tree = (
      <Provider store={store}>
        <CurrentEOSBalance />
      </Provider>
    );

    shallow(tree);
  });
});
