import * as React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import { configureStore } from "util/configureStore";
import Balance from "./";

describe("<BalanceContainer />", () => {
  it("renders without crashing", () => {
    const store = configureStore({
      login: {
        user: {
          account_name: "inita"
        }
      },
      'eos-account': {
        balance: {
          total: 0,
          staked: "",
          unstaked: "",
          difference: 0,
          symbol: ""
        }
      }
    });
    const tree = (
      <Provider store={store}>
        <Balance />
      </Provider>
    );

    shallow(tree);
  });
});
