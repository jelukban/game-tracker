import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import secureLocalStorage from "react-secure-storage";

function Follows() {
  const navigate = useNavigate();
  const user = JSON.parse(secureLocalStorage.getItem("user"))
    ? JSON.parse(secureLocalStorage.getItem("user"))
    : undefined;

  const [isLoaded, setIsLoaded] = useState(false);

  const [state, setState] = useState({
    follows: [],
    showModal: true,
  });

  const { follows, showModal } = state;

  useEffect(() => {
    fetch(`/user/followings`, {
      headers: {
        User: JSON.stringify(user),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message !== "User has no follows") {
          setState({ ...state, follows: result.data });
        }
      });
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, [follows]);

  const handleClose = () => {
    // setShow(false);
    setState({ ...state, showModal: false });
    navigate("/explore");
  };

  if (isLoaded) {
    return (
      <Modal
        show={showModal}
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
            {follows.map((follow, idx) => (
              <div key={idx}>
                <ListGroup.Item
                  action
                  href={`/dashboard/following/${follow.id}`}
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
