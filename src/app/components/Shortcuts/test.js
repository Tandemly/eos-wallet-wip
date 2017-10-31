import * as React from "react";
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router';
import Shortcuts from './';

describe('<Shortcuts />', () => {
  it('renders without crashing', () => {
    const staticContext = {};
    const data = [
      // recursive item
      [
        {
          to: '/',
          text: 'Transfer',
          iconClass: 'icon-transfer u-mr1',
        },
      ],
      // stand alone shortuct
      {
        to: '/users',
        text: 'Users',
      },
    ];
    
    const tree = renderer.create(
      <StaticRouter location="/" context={staticContext}>
        <Shortcuts data={data} />
      </StaticRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
})


