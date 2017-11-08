import * as React from "react";
import css from "./styles.module.scss";
import cx from "classnames";

const User = ({ icon, key, name = "", status, url }) => (
  <li className="level box user is-mobile" key={key}>
    <div className="level-left">
      <div className="level-item">
        <img
          className="user-thumb"
          src="/images/male_2.jpg"
          alt="Placeholder avatar thumbnail"
        />
      </div>
      <div className="level-item">
        <div>
          <p className={cx("username", css.username)}>
            <a>{name}</a>
          </p>
          <p className={cx("memo", css.memo)}>Memo</p>
        </div>
      </div>
    </div>
  </li>
);

export default User;
