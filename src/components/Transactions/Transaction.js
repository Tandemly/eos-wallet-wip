import * as React from "react";
import css from "./styles.module.scss";
import cx from "classnames";

const Transaction = ({ key, date, image, name, memo, amount, kind }) => (
  <li className="level box is-mobile" key={key}>
    <div className="level-left">
      <div className="level-item has-text-centered">
        <div className={css.date}>
          <p className={cx("heading", css.heading)}>{date.month}</p>
          <p className={cx("title", css.title)}>{date.day}</p>
        </div>
      </div>
      <div className="level-item">
        <img
          className="user-thumb"
          src="/images/male_2.jpg"
          alt="Placeholder avatar thumbnail"
        />
      </div>
      <div className="level-item">
        <p className="subtitle is-6">
          <a>{name}</a>
        </p>
        <p className="subtitle is-6">
          <a>{memo}</a>
        </p>
      </div>
    </div>
    <div className="level-right">
      <div className="level-item">
        <p className="subtitle is-6">
          {amount}
          <span
            className={cx(
              kind === "withdrawal"
                ? `icon-transfer_to ${css.iconTransferTo}`
                : `icon-transfer_from ${css.iconTransferFrom}`,
              "u-ml1"
            )}
          />
        </p>
      </div>
    </div>
  </li>
);

export default Transaction;
