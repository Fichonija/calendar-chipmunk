import Modal from "../modal";

const ConfirmModal = ({ isVisible, title, body, onConfirm, onClose }) => {
  const footer = (
    <>
      <button onClick={onConfirm}>OK</button>
      <button onClick={onClose}>Cancel</button>
    </>
  );

  return <Modal isVisible={isVisible} title={title} body={body} footer={footer} onClose={onClose} />;
};

export default ConfirmModal;
