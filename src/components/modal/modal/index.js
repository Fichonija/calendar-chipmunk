import "./modal.css";

const Modal = ({ isVisible, title, body, footer, onClose }) => {
  const isVisibleClassNames = isVisible ? "modal visible" : "modal";

  return (
    <div className={isVisibleClassNames}>
      <div className="modal-content">
        <div className="modal-header">
          <h4>{title}</h4>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">{body}</div>
        <div className="modal-footer">{footer}</div>
      </div>
    </div>
  );
};

export default Modal;
