import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { setId } from "../../redux/slices/followSlice";
import useQueryUserFollows from "../../hooks/useQueryUserFollows";

function FollowsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(true);

  const followsQuery = useQueryUserFollows();
  const follows = followsQuery.isSuccess ? followsQuery?.data?.data?.data : [];

  const handleClose = () => {
    setShowModal(false);
    navigate("/explore");
  };

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
                onClick={() => {
                  dispatch(setId(follow.id));
                  navigate(
                    `/dashboard/following/${follow.firstName.toLowerCase()}.${follow.lastName.toLowerCase()}`
                  );
                }}
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

export default FollowsList;
