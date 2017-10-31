import * as React from "react";
import numeral from 'numeral';
import css from "./styles.module.scss";
import cx from "classnames";

const Balance = ({ total, difference, symbol /* , account_name */ }) => (
  <div className="-is-logged-in">
    <div className={cx("financials u-p3", css.financials)}>
      <p className={cx("title is-1", css.balance)}>{numeral(total).format('0.00a')}<span>B</span></p>
      <p className={cx("full_balance is-6", css.full_balance)}>{numeral(total).format('0,0[.]0000')}</p>
      {difference && <div className={cx("tag change", css.tag)}>{symbol}{difference}</div>}
    </div>
  </div>
);

export default Balance;
