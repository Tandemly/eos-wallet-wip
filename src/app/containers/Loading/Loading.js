import * as React from "react";
import cx from "classnames";
import css from "./styles.module.scss";

const Loading = () => (
  <div className={css.loading}>
    <div className={css.loading_image}>
      <img alt="" className={css.Loading_img} src="/images/logo.svg" />
    </div>
    <span className={cx("icon-loader", css.icon_loader)} />
  </div>
);

export default Loading;