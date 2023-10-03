import React from "react";
import { Button } from "react-bootstrap";

const Options = (props) => {
  const handleOptionChange = () => {
    props.change(props.option);
  };

  return (
    <div className="opt">
      <div className="btn">
        <Button
          type="button"
          variant="secondary"
          name="option"
          value={decodeURIComponent(props.option)}
          id={props.option}
          onClick={handleOptionChange}
        >
          {decodeURIComponent(props.option)}
        </Button>
      </div>
    </div>
  );
};

export default Options;
