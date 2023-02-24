import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Follows({ user }) {
  const navigate = useNavigate();

  const [follows, setFollows] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    fetch(`/user/followings`, {
      headers: {
        User: JSON.stringify(user),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status !== "User has no follows") {
          setFollows(result);
        }
      });
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, [follows]);

  const handleClose = () => {
    setShow(false);
    navigate("/explore");
  };

  if (isLoaded) {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="follows-card"
      >
        <Modal.Header closeButton>
          <Modal.Title className="follows-list-title w-100">
            Following
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {follows.map((follow) => (
              <div>
                <ListGroup.Item
                  action
                  href={`/dashboard/${user.id}/following/${follow.id}`}
                  className="follows-list"
                >
                  {follow.firstName} {follow.lastName}
                </ListGroup.Item>
              </div>
            ))}
          </ListGroup>
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
}

export default Follows;
