import React from "react";
import { Card } from "react-bootstrap";
import { Button } from "antd";

export default function ResultCard(props) {
  return (
    <Card className="result">
      <Card.Body>
        <h2>{props.pass ? "Congratulations!" : "Sorry"}</h2>
        <p>
          {props.pass ? "You passed the level!" : "You did not pass the quiz."}
        </p>
        <Button onClick={props.play} size="large">
          {props.pass ? "Play Again!" : "Try Again!"}
        </Button>
      </Card.Body>
    </Card>
  );
}
