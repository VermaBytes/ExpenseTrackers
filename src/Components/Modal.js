// src/components/Modal.js
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function Modal({ onClose, children }) {
  const [modalRoot, setModalRoot] = useState(null);

  useEffect(() => {
    // Get the DOM element to mount the modal to
    const el = document.getElementById('modal-root');
    if (el) {
      setModalRoot(el);
    } else {
      console.error("Modal root element not found. Please add <div id='modal-root'></div> to your index.html.");
    }
    // No cleanup needed here as modalRoot is not being added/removed by this component
  }, []); // Run only once on mount

  if (!modalRoot) {
    return null; // Don't try to render the portal if the root is not found yet
  }

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>,
    modalRoot // This must be a valid DOM element
  );
}

export default Modal;