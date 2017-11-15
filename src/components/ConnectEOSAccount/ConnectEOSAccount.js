import React from "react";
import Button from "components/Button";

const ConnectEOSAccount = ({}) => (
  <div className="columns is-desktop content is-variable is-6">
    <Helmet>
      <title>Connect Accounts</title>
    </Helmet>
    <div className="column is-half-desktop">
      <h2 className="title is-2">Connect Accounts</h2>
      <h3 className="title is-3">Reset Wallet Password</h3>
    </div>
    <div className="columns">
      <div className="column">
        <div className="level is-clearfix">
          <div className="level-left is-pulled-left">
            <div className="level-item">
              <div className="field">
                <div className="control">
                  <Button
                    disabled={submitting}
                    className="button is-large is-primary"
                    type="submit"
                    text={submitting ? 'Submitting...' : 'Add Account'}
                  />
                </div>
              </div>
            </div>
            <div className="level-item">
              <p>Don’t have an account? <a>Sign Up</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default reduxForm({
  form: 'connect-eos-account',
})(ConnectedEOSAccountsForm);
