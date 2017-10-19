import * as React from "react";
import Balance from "containers/Balance";
import Shortcuts from "components/Shortcuts";

const Menu = () => (
  <div className="menu p-lg">
    <Balance />

    <Shortcuts />
  </div>
);

export default Menu;