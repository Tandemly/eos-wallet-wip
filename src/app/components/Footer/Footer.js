import * as React from "react";
import css from "./styles.module.scss";
import cx from "classnames";

const Footer = () => (
  <footer>
    <div className="columns u-pt2 is-variable is-3">
      <div className="column has-text-left-tablet has-text-centered-mobile">
        <p>Copyright 2017 | All Rights Reserved</p>
      </div>
      <div className="column has-text-right-tablet has-text-centered-mobile">
        <a href="/privacy">Privacy Policy</a>
        <span> | </span>
        <a href="/terms">Terms of Service</a>
      </div>
    </div>
  </footer>
);

export default Footer;