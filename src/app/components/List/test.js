import * as React from "react";
import renderer from 'react-test-renderer';
import List from './';

describe('<List />', () => {
  it('renders without crashing', () => {
    const data = [
      { text: 'One' },
      { text: 'Two' },
      { text: 'Three' },
    ];
    const renderItem = ({ key, text }) => (
      <p key={key}>{text}</p>
    );

    const tree = renderer.create(
      <List
        data={data}
        renderItem={renderItem}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
})


