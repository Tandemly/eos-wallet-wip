import * as React from "react";
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import renderField from 'components/Field';
import Button from "components/Button";

const LoginForm = ({
  callAPI,
  handleSubmit,
  handleClose,
  modal,
  submitting,
  email,
  className }) => (
  <form onSubmit={handleSubmit(callAPI)} className={className}>
    
    <Field
      aria-describedby="email"
      className="input"
      component={renderField}
      id="email"
      label="Email"
      name="email"
      required
      prefixed
      type="email"
      value={email}
    />

    <Field
      aria-describedby="password"
      className="input"
      component={renderField}
      id="password"
      label="Password"
      name="password"
      required
      type="password"
    />

    <div className="field">
      <div className="control">
        <label className="label"><input type="checkbox" /> Keep me logged in</label>
      </div>
    </div>

    <div className="field is-grouped u-mt4">
      <div className="control login-button">
        <Button
          disabled={submitting}
          className="button is-large is-primary"
          type="submit"
          text={submitting ? 'Submitting...' : 'Login'}
        />
      </div>
      <div className="control cancel-button">
        <Button
          disabled={submitting}
          className="button is-large is-secondary"
          type="submit"
          text="Cancel"
        />
      </div>
    </div>

    <div className={`col-12 ${modal ? 'text-left' : 'text-center'}`}>
      <Link to="/create-account" className="text-link">Don&#39;t have an account?</Link>
    </div>
  </form>
);

export default reduxForm({
  form: 'login',
})(LoginForm);
