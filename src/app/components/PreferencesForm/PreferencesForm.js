import * as React from "react";
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/Field';
import Button from "components/Button";

const PreferencesForm = ({ 
  callAPI,
  handleSubmit,
  submitting, }) => (
  <form onSubmit={handleSubmit(callAPI)}>
    <Field
      aria-describedby="email"
      className="input"
      id="pictureURL"
      label="Picture URL"
      name="pictureURL"
      required
      component={renderField}
      type="text"
    />
    <Field
      aria-describedby="displayName"
      className="input"
      id="displayName"
      label="Display Name"
      name="displayName"
      required
      component={renderField}
      type="text"
    />
    <Field
      aria-describedby="about"
      className="input"
      id="about"
      label="About (150 Character Max)"
      name="about"
      required
      component={renderField}
      type="text"
    />
    <Field
      aria-describedby="location"
      className="input"
      id="location"
      label="Location"
      name="location"
      required
      component={renderField}
      type="text"
    />
    <Field
      aria-describedby="website"
      className="input"
      id="website"
      label="Website"
      name="website"
      required
      component={renderField}
      type="text"
    />
    <div className="field u-mt4">
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
})(PreferencesForm);
