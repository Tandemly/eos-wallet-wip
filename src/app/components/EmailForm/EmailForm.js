import * as React from "react";
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/Field';
import Button from "components/Button";

const EmailForm = ({ 
  callAPI,
  handleSubmit,
  submitting, }) => (
  <form onSubmit={handleSubmit(callAPI)}>
    <Field
      aria-describedby="email"
      className="input"
      id="email"
      label="Next enter your email"
      name="email"
      required
      component={renderField}
      type="email"
    />

    <div className="field">
      <div className="control">
        <Button
          disabled={submitting}
          className="button is-large is-primary"
          type="submit"
          text={submitting ? 'Submitting...' : 'Continue'}
        />
      </div>
    </div>
  </form>
);

export default reduxForm({
  form: 'sign-up',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(EmailForm);

