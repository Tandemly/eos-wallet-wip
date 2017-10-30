import * as React from "react";
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/Field';
import Button from "components/Button";

const ConnectedEOSAccountsForm = ({ 
  callAPI,
  handleSubmit,
  submitting, }) => (
  <form onSubmit={handleSubmit(callAPI)}>
  <h3>Connect your EOS Account</h3>
    <div className="box">
      <div className="columns is-desktop">
        <div className="column is-half-desktop">
          <Field
            aria-describedby="account_name"
            className="input"
            id="account_name"
            label="EOS Account Name"
            name="account_name"
            required
            component={renderField}
            type="text"
          />
        </div>
      </div>
      <div className="columns is-desktop">
        <div className="column">
          <Field
            aria-describedby="active_key"
            className="input"
            id="active_key"
            label="EOS Active Key"
            name="active_key"
            required
            component={renderField}
            type="text"
          />
        </div>
        <div className="column">
          <Field
            aria-describedby="owner_key"
            className="input"
            id="owner_key"
            label="EOS Owner Key"
            name="owner_key"
            required
            component={renderField}
            type="text"
          />
        </div>
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
                      text={submitting ? 'Submitting...' : 'Login to EOS'}
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
  </form>
);

export default reduxForm({
  form: 'connected-accounts',
})(ConnectedEOSAccountsForm);
