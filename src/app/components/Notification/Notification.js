import * as React from "react";
import cx from "classnames";
import css from "./styles.module.scss";

const Notification = ({ text, status }) => (
  !status ? null :
  <div className={cx(css.notification, css[status])}>
    <div className={cx("icon-success", css.icon)}></div>
    {text}
    <span className={cx("icon-x", css.close)}></span>
  </div>
);

export default Notification;
