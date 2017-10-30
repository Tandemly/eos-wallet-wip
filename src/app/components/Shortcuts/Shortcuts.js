import * as React from "react";
import List from "components/List";
import Shortcut from "./Shortcut";
import cx from "classnames";
import css from "./styles.module.scss";

const Shortcuts = ({
  data,
}) => (
  <List
    className={cx("menulist", css.menulist)}
    data={data}
    renderItem={Shortcut}
  />
);

export default Shortcuts;
