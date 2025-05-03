import React from 'react';
import '../ProductStyle/Modal.css'; // Ensure you add this CSS to style the modal

const Modal = ({ isOpen, close, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={close}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
