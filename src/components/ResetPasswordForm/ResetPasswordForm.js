import * as React from "react";
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/Field';

const ResetPasswordForm = ({ 
  callAPI,
  handleSubmit,
  submitting, }) => (
  <form onSubmit={handleSubmit(callAPI)}>
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
    <Field
      aria-describedby="currentPassword"
      className="input"
      id="currentPassword"
      label="Current Password"
      name="currentPassword"
      required
      component={renderField}
      type="text"
    />
    <div className="row col-12 no-gutters p-0 mb-3">
      <div className="col-sm-auto col-12 pl-0 pr-0">
        <button
          className="btn btn-secondary btn-lg btn-block"
          type="submit"
        >Regenerate Password
        </button>
      </div>
    </div>
    <div className="field u-mt4">
      <div className="control">
        <button
          disabled={submitting}
          className="button is-large is-secondary"
          type="submit"
        >
          {submitting ? 'Submitting...' : 'Regenerate Password'}
        </button>
      </div>
    </div>
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
    <div className="field u-mt4">
      <div className="control">
        <button
          disabled={submitting}
          className="button is-large is-primary"
          type="submit"
        >
          {submitting ? 'Submitting...' : 'Update Password'}
        </button>
      </div>
    </div>
  </form>
);

export default reduxForm({
  form: 'sign-up',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(ResetPasswordForm);