import React from "react";
import { Button, Card } from "react-bootstrap";

export default function ResultCard(props) {
  return (
    <Card className="result">
      <Card.Body>
        <h2>{props.pass ? "Congratulations!" : "Sorry"}</h2>
        <p>
          {props.pass ? "You passed the level!" : "You did not pass the quiz."}
        </p>
        <Button variant="secondary" onClick={props.play}>
          {props.pass ? "Play Again!" : "Try Again!"}
        </Button>
      </Card.Body>
    </Card>
  );
}
