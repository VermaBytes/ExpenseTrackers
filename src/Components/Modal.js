// src/components/Modal.js
import React from 'react';
import ReactDOM from 'react-dom';
import '../App.css'; // Assuming modal styles are also in App.css

const Modal = ({ onClose, children }) => {
    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
                <button className="modal-close-btn" onClick={onClose}>&times;</button>
            </div>
        </div>,
        document.getElementById('modal-root') // You'll need to add <div id="modal-root"></div> to your public/index.html
    );
};

export default Modal;