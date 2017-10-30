import * as React from "react";
import Notifications from "containers/Notifications";
import Progress from "components/Progress";

const steps = {
  '/signup': 1,
  '/signup/email': 2,
  '/signup/phone': 3,
  '/signup/complete': 4
};

const CreateAccount = ({
  children,
  location,
  handleClose,
}) => {
  const step = Object.keys(steps)
    .reduce((acc, path) => (path === location.pathname ? steps[path] : acc), 1);

  return (
    <div className="login">
      <div className="login-header modal-header">
        <h3 className="title is-3">Create your Wallet account</h3>

        <button
          className="js-modal-close"
          onClick={handleClose}
        >
          x
        </button>
      </div>

      <div className="modal-body">
        <Notifications />

        <Progress step={step} />

        {children}
      </div>
    </div>
  );
};

export default CreateAccount;
