import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import secureLocalStorage from "react-secure-storage";

function LoginPage({ handleLoginSubmit, showError }) {
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
          Welcome back gamer!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLoginSubmit} className="forms">
          <Form.Group className="w-100" controlId="formBasicEmail">
            <Form.Label className="field-labels">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => {
                secureLocalStorage.setItem("loginEmail", e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="w-100" controlId="formBasicPassword">
            <Form.Label className="field-labels">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                secureLocalStorage.setItem("loginPassword", e.target.value);
              }}
              mb={8}
            />
          </Form.Group>
          <Button variant="secondary" className="form-button" type="submit">
            Submit
          </Button>
        </Form>
        {showError.show ? (
          <Alert variant="danger"> {showError.message}</Alert>
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

export default LoginPage;
