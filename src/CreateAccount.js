import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';


function CreateAccount ({handleSubmit,setFirstName, setLastName, setEmail, setPassword, showError }) {

    return (
        <React.Fragment>
            <Form onSubmit={handleSubmit}> Create an Account
                <Form.Group className="w-25" controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" onChange={setFirstName} />
                </Form.Group>

                <Form.Group className="w-25" controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" onChange={setLastName} />
                </Form.Group>

                <Form.Group className="w-25" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={setEmail} />
                </Form.Group>

                <Form.Group className="w-25" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={setPassword} mb={8}/>
                    <Form.Text className="text-muted"> Password must be at least 8 characters
                    </Form.Text>
                </Form.Group>
            <Button variant="primary" type="submit">
            Submit
            </Button>
        </Form>
        {showError.show ? <Alert variant="danger" > {showError.message} </Alert> : ''}
        </React.Fragment>
    );
};

export default CreateAccount;