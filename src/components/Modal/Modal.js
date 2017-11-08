import * as React from "react";
import ReactModal from "react-modal";

const Modal = ({ handleClose, isOpen, renderRoute, ...props }) =>
  !isOpen ? (
    <ReactModal />
  ) : (
    <ReactModal isOpen onRequestClose={handleClose} {...props}>
      {renderRoute({ handleClose })}
    </ReactModal>
  );

export default Modal;
