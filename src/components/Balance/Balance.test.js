import * as React from "react";
import renderer from "react-test-renderer";
import Balance from "./Balance";

describe("<Balance />", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(<Balance />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
