// @flow
import React from "react";
import cx from "classnames";

const sizes = {
  small: "is-small",
  medium: "is-medium",
  large: "is-large"
};

const Icon = ({
  icon,
  className,
  size
}: {
  icon: string,
  className?: string,
  size?: string
}) => {
  return (
    <span className={cx("icon", { size: sizes[size] }, className)}>
      <i className={icon} />
    </span>
  );
};

export default Icon;
