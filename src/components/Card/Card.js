import "./Card.css";

const Card = (props) => {
  return (
    <div class="card">
      <div class="container">
        <h4>{props.title}</h4>
        <p>{props.details}</p>
      </div>
    </div>
  );
};

export default Card;
