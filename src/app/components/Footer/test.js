import * as React from "react";
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router';
import Footer from './';

describe('<Footer />', () => {
  it('renders without crashing', () => {
    const staticContext = {};
    const tree = renderer.create(
      <StaticRouter location="/" context={staticContext}>
        <Footer />
      </StaticRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
})

