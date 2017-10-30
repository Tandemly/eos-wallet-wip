import * as React from "react";
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router';
import Header from './';

describe('<Header />', () => {
  it('renders without crashing', () => {
    const staticContext = {};
    const tree = renderer.create(
      <StaticRouter location="/" context={staticContext}>
        <Header />
      </StaticRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
})

