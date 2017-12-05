import * as React from "react";
import numeral from "numeral";
import css from "./styles.module.scss";
import cx from "classnames";

const Balance = ({ total, difference }) => (
  <div className="-is-logged-in">
    <div className={cx("financials u-p3", css.financials)}>
      <p className={cx("title is-1", css.balance)}>
        {numeral(total).format("0.00a")}
      </p>
      <p className={cx("full_balance is-6", css.full_balance)}>
        {numeral(total).format("0,0.0000")}
      </p>
      {!!difference && (
        <div
          className={cx("tag change", css.tag, {
            [css.minus]: difference < 0
          })}
        >
          {difference > 0 && "+"}
          {difference.toFixed(4)}
        </div>
      )}
    </div>
  </div>
);

export default Balance;
