//@flow
import * as React from "react";
import cx from "classnames";
import css from "./styles.module.scss";

type Status = "success" | "info" | "error" | "warn";

type Props = {
  text: string,
  status?: Status,
  minimized?: boolean,
  unsetNotification?: () => mixed
};

const icons = {
  success: "icon-success",
  info: "icon-info",
  error: "icon-fail_warn",
  warn: "icon-fail_warn"
};

const Notification = ({
  text,
  status = "info",
  minimized = false,
  unsetNotification
}: Props) =>
  !text ? null : (
    <div className={cx(css.notification, css[status], { min: minimized })}>
      <div className={cx(icons[status], css.icon)} />
      {text}
      {unsetNotification && (
        <span className={cx("icon-x", css.close)} onClick={unsetNotification} />
      )}
    </div>
  );

export default Notification;
