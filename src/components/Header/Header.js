import React from "react";
import { Link } from "react-router-dom";
import css from "./styles.module.scss";
import cx from "classnames";

const Header = ({
  children,
  onMenuClick,
}) => (
  <header className={cx("hero", css.header)}>
    <div className="level is-mobile">
      <div className="level-left">
        <div className="control level-item is-hidden-tablet">
          <button className={cx("button is-primary u-mr1", css.menu_toggle)}><span className="icon-menu"></span></button>
        </div>
        <div className="level-item">
          <Link to="/">
            <img alt="" className={cx("image", css.logo)} src="/images/logo.svg" />
          </Link>
        </div>
      </div>
      <div className={css.user_info}>
        <div className="has-text-right is-hidden-mobile">
          <div className={css.user_meta}>
            <h4 className={cx("title is-4 is-spaced", css.title)}>Hi, Display Name</h4>
            <p className={cx("subtitle is-6", css.subtitle)}>
              <Link to="/preferences">Customize your profile</Link> | 
              <Link to="/logout"> <span className="icon-logout"></span></Link>
            </p>
          </div>
        </div>

        <Link
          className={css.settings}
          to="/preferences"
        >
          <span className="icon-settings"></span>
        </Link>

        <figure className={cx("image", css.profile_thumbnail)}>
          <img src="https://avatarfiles.alphacoders.com/696/69632.jpg" alt="Placeholder image" />
        </figure>
      </div>
    </div>
  </header>
);

export default Header;
