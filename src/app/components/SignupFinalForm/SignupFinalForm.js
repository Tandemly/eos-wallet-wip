import * as React from "react";
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

// TODO show errors from server when unable to connect
// { message: 'EOS is down currently, please try again later' }
const SignupFinalForm = ({
  callAPI,
  formValues,
  error,
  handleSubmit,
  submitting }) => (
  <form onSubmit={handleSubmit(callAPI)}>
    <h3>Create Wallet Account</h3>
    <fieldset className="form-group">
      <label htmlFor="account_name">The following information will be used to create your account:</label>
      <ul>
        <li>Username: <tt>{formValues.account_name}</tt></li>
        <li>Email: <tt>{formValues.email}</tt></li>
        <li>Phone: <tt>{formValues.phone}</tt></li>
      </ul>
    </fieldset>

    {error &&
      <div className="error-message">
        {error}
      </div>}
  
    <div className="modal-cta">
      <div className="row col-12 no-gutters p-0">
        <div className="col-sm-auto col-12 pl-0 pr-sm-2 pr-0 mb-sm-0 mb-3">
          <button
            disabled={submitting}
            className="btn btn-primary btn-lg btn-block"
            type="submit"
          >
            {submitting ? 'Submitting...' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  </form>
);

const ConnectedCreateAccount = connect(state => ({
  formValues: formValueSelector('sign-up')(state, 'account_name', 'email', 'phone')
}))(SignupFinalForm);

export default reduxForm({
  form: 'sign-up',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(ConnectedCreateAccount);

