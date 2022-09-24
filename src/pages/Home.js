import React from 'react'
import Spinner from '../component/Spinner'
import { Button, Card } from 'react-bootstrap'
import '../App.css'

export default (props) => {

  let btn = props.spinner ? <Spinner /> : 
            <Button variant="secondary"
              onClick={()=>props.click('play')}>Start now!</Button>

  return (
    <Card className="init">
      <Card.Body>
      <h1>Fun Quiz</h1>
      <p>This is to test how smart you are at general knowledge. You only have 15 seconds to answer each question. Get at least 6 correct answers out of 10 to pass the test. Relax, it's so easy!</p>
      {btn}
      </Card.Body>
    </Card>
  )
}