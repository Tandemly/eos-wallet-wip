import * as React from "react";
import { NavLink } from "react-router-dom";
import Shortcuts from "components/Shortcuts";
import css from "./styles.module.scss";

const activeClassName = css.active;

const Shortcut = (item, _key) => {
  if (Array.isArray(item)) {
    return (
      <li key={_key}>
        <Shortcuts className="-is-logged-in" data={item} />
      </li>
    );
  } else {
    const {
      iconClass,
      text,
      key,
      ...props } = item;

    return (
      <li key={key}>
        <NavLink
          exact
          activeClassName={activeClassName}
          {...props}
        >
          <span className={iconClass} />
          {text}
        </NavLink>
      </li>
    );
  }
}

export default Shortcut;
