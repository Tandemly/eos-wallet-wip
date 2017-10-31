import * as React from "react";
import List from "components/List";
import User from "./User";
import css from "./styles.module.scss";
import cx from "classnames";

// TODO add search filter
const Users = ({ data }) => (
  <div className="users-list">
    <List
      data={data}
      renderItem={User}
      className={cx("list users", css.users)}
    />
  </div>
);

export default Users;
