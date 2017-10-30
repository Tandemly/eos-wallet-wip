import * as React from "react";
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/Field';
import Button from "components/Button";

const Label = () => (
  <p>
    Current Password
    <a className="help">Regenerate Password</a>
  </p>
);

const ResetPasswordForm = ({ 
  callAPI,
  handleSubmit,
  submitting, }) => (
  <form onSubmit={handleSubmit(callAPI)}>
    <div className="reset_password">
      <div className="columns is-desktop">
        <div className="column is-half-desktop">
          <Field
            aria-describedby="accountName"
            className="input"
            id="accountName"
            label="Account Name"
            name="accountName"
            required
            component={renderField}
            type="text"
          />
        </div>
      </div>
      <div className="columns is-desktop">
        <div className="column is-half-desktop">
          <Field
            aria-describedby="currentPassword"
            className="input"
            id="currentPassword"
            label={<Label />}
            name="currentPassword"
            required
            component={renderField}
            type="text"
          />
        </div>
      </div>
      <div className="columns is-desktop">
        <div className="column is-half-desktop">
          <div className="field">
            <div className="control">
              <Button
                disabled={submitting}
                className="button is-large is-secondary"
                type="submit"
                text={submitting ? 'Submitting...' : 'Regenerate Password'}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="columns is-desktop">
        <div className="column is-half-desktop">
          <Field
            aria-describedby="regeneratedPassword"
            className="input"
            id="regeneratedPassword"
            label="Re-Generated Password"
            name="regeneratedPassword"
            required
            component={renderField}
            type="text"
          />
        </div>
      </div>
      <div className="columns is-desktop">
        <div className="column is-half-desktop">
          <div className="field">
            <div className="control">
              <Button
                disabled={submitting}
                className="button is-large is-primary"
                type="submit"
                text={submitting ? 'Submitting...' : 'Update Password'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
);

export default reduxForm({
  form: 'sign-up',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(ResetPasswordForm);