import * as React from "react";
import renderer from 'react-test-renderer';
import Balance from './';

describe('<Balance />', () => {
  it('renders without crashing', () => {
    const tree = renderer.create(
      <Balance />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
})

