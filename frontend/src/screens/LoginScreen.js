import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import {  Link } from 'react-router-dom'
import { Button, Col, Row,Form } from 'react-bootstrap';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function submitHandler(e){
    e.preventDefault();
    // TODO: Add validation and server-side logic to register user
    console.log(`Email: ${email}, Password: ${password}, Confirm Password: `);
  }
  return (
  <FormContainer>
    <h1>Sign In</h1>

    <Form onSubmit={submitHandler}>
      <Form.Group className='my-2' controlId='email'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group className='my-2' controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Button disabled={"isLoading"} type='submit' variant='primary'>
        Sign In
      </Button>

      {/* {isLoading && <Loader />} */}
    </Form>

    <Row className='py-3'>
      <Col>
        New Customer?{' '}
        <Link to={false ? `/register?redirect=${false}` : '/register'}>
          Register
        </Link>
      </Col>
    </Row>
  </FormContainer>
  )
}

export default LoginScreen