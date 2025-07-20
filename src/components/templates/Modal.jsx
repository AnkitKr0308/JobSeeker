import React from "react";
import "../../css/modal.css";

function Modal({ isOpen, onClose, title, message, input, button, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="modal-close" onClick={onClose}>
          &times;
        </span>
        {title && <h2>{title}</h2>}
        {message && <p>{message}</p>}
        {children}
      </div>
    </div>
  );
}

export default Modal;
