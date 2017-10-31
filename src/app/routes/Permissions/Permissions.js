import * as React from "react";
import { Helmet } from 'react-helmet';
import ResetPassword from 'containers/ResetPassword';
import ConnectedEOSAccounts from 'containers/ConnectedEOSAccounts';

const Permissions = () => (
  <div>
    <Helmet>
      <title>Permissions</title>
    </Helmet>
    <div className="content">
      <div className="row">
        <div className="col-12">
          <h2 className="title is-2">Permissions</h2>
        </div>
      </div>

      <section className="section">
        <h3></h3>
        <div className="row">
          <div className="col-12 col-lg-6">
            <ConnectedEOSAccounts />
          </div>
        </div>
      </section>

      <section className="section">
        <h3>Reset Password</h3>
        <div className="row">
          <div className="col-12 col-lg-6">
            <ResetPassword />
          </div>
        </div>
      </section>
    </div>
  </div>
);

export default Permissions;
