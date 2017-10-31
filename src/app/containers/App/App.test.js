import * as React from "react";
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import App from './App';
import { shallow } from "enzyme";
import { configureStore } from 'util/configureStore';


it('renders without crashing', () => {
  const staticContext = {};
  const store = configureStore();
  const tree = (
    <StaticRouter location="/" context={staticContext}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  );

  shallow(tree);
});
