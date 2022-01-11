import "./Card.css";

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-container">
        <h4>{props.title}</h4>
        <p>
          Start: {props.startTime}
          <br />
          End: {props.endTime}
        </p>
        <p>{props.details}</p>
      </div>
    </div>
  );
};

export default Card;
