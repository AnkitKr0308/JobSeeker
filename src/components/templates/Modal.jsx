import React from "react";
import "../../css/modal.css";

function Modal({ isOpen, onClose, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="modal-close" onClick={onClose}>&times;</span>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Modal;
