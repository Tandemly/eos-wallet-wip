import * as React from "react";
import _Modal from "react-modal";
import { withRouter } from "react-router-dom";

const Modal = ({
  handleClose, 
  isOpen,
  renderRoute,
   ...props 
}) => (
  !isOpen ? <_Modal /> :
  <_Modal
    isOpen
    onRequestClose={handleClose}
    {...props}
  >
    {renderRoute({ handleClose })}
  </_Modal>
);

export default Modal;