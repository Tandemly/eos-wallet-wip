import * as React from "react";
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/Field';
import Button from "components/Button";
import normalizePhone from 'util/normalizePhone';

const PhoneForm = ({
  callAPI,
  handleSubmit,
  submitting, }) => (
  <form onSubmit={handleSubmit(callAPI)}>

    <Field
      aria-describedby="phone"
      className="input"
      id="phone"
      label="Phone number"
      name="phone"
      component={renderField}
      normalize={normalizePhone}
      type="text"
      required
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
})(PhoneForm);
