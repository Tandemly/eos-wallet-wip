import * as React from "react";
import { Helmet } from "react-helmet";
import Notifications from "containers/Notifications";
import ConnectedEOSAccounts from "containers/ConnectedEOSAccounts";

const Permissions = ({}) => (
  <div>
    <Helmet>
      <title>Accounts</title>
    </Helmet>
    <div className="content">
      <Notifications />

      <h2 className="title is-2">Accounts</h2>

      <article>
        <ConnectedEOSAccounts />
      </article>
    </div>
  </div>
);

export default Permissions;
