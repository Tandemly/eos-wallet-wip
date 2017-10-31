import * as React from "react";
import css from "./styles.module.scss";

const Progress = ({ step }) => (
  <div className={css.progress}>
    <ul className={css.list}>
      <li className={[css.progressItem, step >= 1 ? css.active : ''].join(' ')} />
      <li className={[css.progressItem, step >= 2 ? css.active : ''].join(' ')} />
      <li className={[css.progressItem, step >= 3 ? css.active : ''].join(' ')} />
      <li className={[css.progressItem, step >= 4 ? css.active : ''].join(' ')} />
    </ul>
  </div>
);

export default Progress;
