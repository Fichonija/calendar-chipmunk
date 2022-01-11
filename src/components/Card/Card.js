import "./Card.css";

const Card = ({ title, subtitle, content }) => {
  return (
    <div className="card">
      <div className="card-container">
        <h4 className="card-title">{title}</h4>
        <p className="card-subtitle">{subtitle}</p>
        <p className="card-content">{content}</p>
      </div>
    </div>
  );
};

export default Card;
