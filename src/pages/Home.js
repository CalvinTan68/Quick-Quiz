import React from "react";
import { Card } from "react-bootstrap";
import "../App.css";
import { Button } from "antd";

const InitialCard = (props) => {
  return (
    <Card className="init">
      <Card.Body>
        <h1>Fun Quiz</h1>
        <p>
          This is to test how smart you are at general knowledge. You only have
          15 seconds to answer each question. Get at least 6 correct answers out
          of 10 to pass the test. Relax, it's so easy!
        </p>
        <Button
          size="large"
          loading={props.spinner}
          onClick={() => props.click("play")}
        >
          Start now!
        </Button>
      </Card.Body>
    </Card>
  );
};

export default InitialCard;
