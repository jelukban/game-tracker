import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

function LoginPage ({handleSubmit, setEmail, setPassword, showError }) {

    return (
        <React.Fragment>
            <Form onSubmit={handleSubmit}> Welcome back gamer!
                <Form.Group className="w-25" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={setEmail} />
                </Form.Group>

                <Form.Group className="w-25" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={setPassword} mb={8}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                Submit
                </Button>
            </Form>
            {showError.show ? <Alert variant="danger"> {showError.message}</Alert>: ''}
        </React.Fragment>
    );
};

export default LoginPage;