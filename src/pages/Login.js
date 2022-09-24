import React from 'react'
import { Button, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

function Login() {

    const navigate = useNavigate();

    const submitHandler = event => {
        event.preventDefault();
        navigate('/quiz');
      }

      return (
        <Card>
          <Card.Body>
            <form
            onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />
            </Form.Group>

            <Button variant="primary" type="submit">
            Submit
            </Button>

            </form>
        </Card.Body>
      </Card>
      )
}

export default Login