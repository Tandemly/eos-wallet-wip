import * as React from "react";
import renderer from 'react-test-renderer';
import Notification from './';

describe('<Notification />', () => {
  it('renders without crashing', () => {
    const notification = {
      text: 'Connection error',
      status: 'error'
    };
    const tree = renderer.create(
      <Notification {...notification} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
})


