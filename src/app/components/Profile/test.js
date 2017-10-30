import * as React from "react";
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router';
import Profile from './';

describe('<Profile />', () => {
  it('renders without crashing', () => {
    const staticContext = {};
    const profile = {
      image: {
        url: 'src',
      },
      currentLocation: 'Friday Harbor, WA',
      name: 'Rick Sanchez',
      status: 'active',
    };

    const tree = renderer.create(
      <StaticRouter location="/" context={staticContext}> 
        <Profile {...profile} />
      </StaticRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
})

