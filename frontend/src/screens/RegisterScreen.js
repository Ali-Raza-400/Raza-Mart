import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  function submitHandler(e){
    e.preventDefault();
    // TODO: Add validation and server-side logic to register user
    console.log(`Name: ${name}, Email: ${email}, Password: ${password}, Confirm Password: ${confirmPassword}`);
  }
  return (
    <FormContainer>
    <h1>Register</h1>
    <Form onSubmit={submitHandler}>
      <Form.Group className='my-2' controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='name'
          placeholder='Enter name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Form.Control>
      </Form.Group>

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
      <Form.Group className='my-2' controlId='confirmPassword'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Confirm password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Button disabled={0} type='submit' variant='primary'>
        Register
      </Button>

      {/* {isLoading && <Loader />} */}
    </Form>

    <Row className='py-3'>
      <Col>
        Already have an account?{' '}
        <Link to={"redirect" ? `/login?redirect=${"redirect"}` : '/login'}>
          Login
        </Link>
      </Col>
    </Row>
  </FormContainer>
  )
}

export default RegisterScreen