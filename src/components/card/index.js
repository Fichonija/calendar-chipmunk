import "./card.css";

const Card = ({ title, subtitle, content, onClose }) => {
  return (
    <div className="card">
      <div className="card-container">
        <div className="card-header">
          <h4 className="card-title">{title}</h4>
          <span className="card-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <p className="card-subtitle">{subtitle}</p>
        <p className="card-content">{content}</p>
      </div>
    </div>
  );
};

export default Card;
