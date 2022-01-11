import Card from "../Card/Card";

const CardList = (props) => {
  return (
    <ul>
      <h3>{props.listTitle}</h3>
      {props.listItems.map((item) => (
        <Card key={item.id} title={item.summary} startTime={item.start.toLocaleTimeString()} endTime={item.end.toLocaleTimeString()}></Card>
      ))}
    </ul>
  );
};

export default CardList;
