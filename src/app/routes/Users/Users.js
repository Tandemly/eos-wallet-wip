import * as React from "react";
import { Helmet } from 'react-helmet';
import Container from "containers/Users";
import Filter from "components/Filter";

// TODO move fixture upstream
import users from "fixtures/users";

const Users = () => (
  <div className="content">
    <Helmet>
      <title>Users</title>
    </Helmet>

    <h2 className="title is-2">Users</h2>

    <div>
        <Filter data={users}>
          <Container />
        </Filter>
      </div>
  </div>
);

export default Users;
