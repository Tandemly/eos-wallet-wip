import * as React from "react";

const Field = ({ children, input, label, prefixed, showErrors, type, meta: { touched, error }, ...props }) => (
  <div className={`field${error ? ' validation-error' : ''}`}>
    <label className="label" htmlFor={input.name}>{label}</label>
    {/*
    Needs to havd a conditional for the help class to add a <p> within the label
    {difference && <div className="tag is-primary change">{symbol}{difference}</div>}
    */}

    <div className={`control ${prefixed ? 'input-prefix' : ''}`}>
      <input
        {...input}
        {...props}
        type={type}
      />

      {showErrors && touched &&
        error &&
        <div className="error-message">
          {error}
        </div>}
    </div>

    {children}
  </div>
);

export default Field;
