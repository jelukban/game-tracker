import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

function CreateAccount() {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [user, setUser] = useState({});
  const [showError, setShowError] = useState({ show: false, message: "" });

  const handleClose = () => {
    setShow(false);
    navigate("/explore");
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();

    fetch("/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data !== null) {
          let tempData = {
            id: result.data.user_id,
            firstName: result.data.first_name,
            lastName: result.data.last_name,
            email: result.data.email,
            password: result.data.password,
          };
          secureLocalStorage.setItem("user", JSON.stringify(tempData));
          secureLocalStorage.setItem("authorized", true);
          navigate("/explore");
        } else if (result.message === "Requirements not filled") {
          setShowError({ show: true, message: "Requirements not filled" });
        } else if (
          result.message === "Account with this email already exists"
        ) {
          setShowError({
            show: true,
            message: "Account with this email already exists",
          });
        }
      });
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title className="follows-list-title w-100">
          Create an Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleCreateSubmit} className="forms">
          <Form.Group className="w-100" controlId="formFirstName">
            <Form.Label className="field-labels">First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="w-100" controlId="formLastName">
            <Form.Label className="field-labels">Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="w-100" controlId="formBasicEmail">
            <Form.Label className="field-labels">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="w-100" controlId="formBasicPassword">
            <Form.Label className="field-labels">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
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
