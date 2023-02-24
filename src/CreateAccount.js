import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

function CreateAccount({
  handleSubmit,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  showError,
}) {
  const navigate = useNavigate();

  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    navigate("/explore");
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title className="follows-list-title w-100">
          Create an Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="forms">
          <Form.Group className="w-100" controlId="formFirstName">
            <Form.Label className="field-labels">First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              onChange={setFirstName}
            />
          </Form.Group>

          <Form.Group className="w-100" controlId="formLastName">
            <Form.Label className="field-labels">Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              onChange={setLastName}
            />
          </Form.Group>

          <Form.Group className="w-100" controlId="formBasicEmail">
            <Form.Label className="field-labels">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={setEmail}
            />
          </Form.Group>

          <Form.Group className="w-100" controlId="formBasicPassword">
            <Form.Label className="field-labels">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={setPassword}
              mb={8}
            />
            <Form.Text className="text-muted">
              Password must be at least 8 characters
            </Form.Text>
          </Form.Group>
          <Button variant="secondary" type="submit" className="form-button">
            Submit
          </Button>
        </Form>
        {showError.show ? (
          <Alert variant="danger"> {showError.message} </Alert>
        ) : (
          ""
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
          className="form-button"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateAccount;
