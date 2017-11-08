import * as React from "react";
import Notifications from "containers/Notifications";
import Container from "containers/Signup";

const Signup = ({
  children,
  handleClose,
}) => (
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

      <Container />
    </div>
  </div>
);

export default Signup;
