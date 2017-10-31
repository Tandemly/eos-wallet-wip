import * as React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cx from "classnames";
import css from "./styles.module.scss";

// TODO styles
const Profile = ({
  image: {
    url: src,
  },
  currentLocation,
  name,
  status,
}) => (
  <div className={cx("box", css.profile)}>
    <div className="level">
      <div className="level-left">
        <div className="level-item">
          <img
            src={src}
            className={css.thumbnail}
            alt={name}
          />
        </div>
        <div className="level-item">
          <div>
            <p className={cx("heading is-6", css.heading)}>{name}</p>
            <p className={cx("title", css.title)}>{currentLocation}</p>
          </div>
        </div>
      </div>
    </div>
    <div className="u-mt2">
      <p>{status}</p>
    </div>
  </div>
);

export default Profile;
