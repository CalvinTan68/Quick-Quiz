import React, {Fragment} from 'react'
import { Button, Card } from 'react-bootstrap'

export default function (props) {
  let text;
  if(props.pass){
    text = <Fragment>
              <h2>Congratulations!</h2>
              <p>You passed the level!</p>
              <Button variant="secondary" 
                onClick={()=>props.play()}>Play Again!</Button>
            </Fragment> 
  } else {
    text = <Fragment>
              <h2>Sorry</h2>
              <p>You did not pass the quiz.</p>
              <Button variant="secondary"
                onClick={()=>props.play()}>Try Again!</Button>
            </Fragment> 
  }

  return (
    <Card className='result'>
      <Card.Body>
        {text}
      </Card.Body>
    </Card>
  );
}