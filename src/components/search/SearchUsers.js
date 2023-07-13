import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserRecommendations from "../profile/UserInterests.js";
import UserPlayedGames from "../profile/UserPlayedGames.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import secureLocalStorage from "react-secure-storage";

function SearchUsers() {
  const followerUserInfo = JSON.parse(secureLocalStorage.getItem("user"))
    ? JSON.parse(secureLocalStorage.getItem("user"))
    : undefined;
  const [userEmail, setUserEmail] = useState("");
  const [user, setUser] = useState({});
  const [userFound, setUserFound] = useState(false);
  const [showMessage, setShowMessage] = useState({
    show: false,
    message: "",
    type: "",
  });

  const [show, setShow] = useState(false);

  const [showModalMessage, setShowModalMessage] = useState({
    show: false,
    message: "",
    type: "",
  });

  const [userFollowStatus, setUserFollowStatus] = useState(false);

  const handleClose = () => {
    setShowModalMessage({ show: false, message: "", type: "" });
    setShow(false);
  };

  const handleSearchUser = (e) => {
    e.preventDefault();

    let queryString = new URLSearchParams({
      email: userEmail,
    }).toString();
    let url = `/search/user?${queryString}`;

    fetch(url, {
      headers: {
        User: followerUserInfo.id,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status !== "Account not found") {
          setUser({
            id: result.id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
          });
          setUserFound(true);
          setShow(true);
          setUserFollowStatus(result.follow_status === "true");
        } else {
          setShowMessage({
            show: true,
            message: "Email was not found",
            type: "danger",
          });
        }
      });
  };

  const handleFollow = (e) => {
    e.preventDefault();

    fetch("/follow", {
      method: "PUT",
      body: JSON.stringify({
        followUserId: followerUserInfo.id,
        followingUserId: user.id,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "Follow was made!") {
          setUserFollowStatus(true);
        }
      });
  };

  const handleUnfollow = (e) => {
    e.preventDefault();

    fetch("/unfollow", {
      method: "PUT",
      body: JSON.stringify({
        followUserId: followerUserInfo.id,
        followingUserId: user.id,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "Follow deleted") {
          setUserFollowStatus(false);
        }
      });
  };

  if (userFound) {
    return (
      <div className="search-users-input">
        <Container>
          <Row>
            <h1>Search for other gamers!</h1>
            <Form onSubmit={handleSearchUser} className="d-flex">
              <Form.Control
                type="text"
                placeholder="Email Address"
                onChange={(e) => setUserEmail(e.target.value)}
                id="search-users-bar"
              />
              <Form.Text className="text-muted"></Form.Text>
              <Button variant="secondary" type="submit" className="form-button">
                Search
              </Button>
            </Form>
          </Row>
        </Container>
        {showMessage.show ? (
          <Alert variant={showMessage.type}> {showMessage.message}</Alert>
        ) : (
          ""
        )}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h1>Welcome to {user.firstName}'s library!</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="follow-button">
              {!userFollowStatus ? (
                <Button
                  variant="secondary"
                  onClick={handleFollow}
                  className="form-button"
                >
                  Follow
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={handleUnfollow}
                  className="form-button"
                >
                  Unfollow
                </Button>
              )}
            </div>
            {showModalMessage.show ? (
              <Alert variant={showModalMessage.type}>
                {" "}
                {showModalMessage.message}
              </Alert>
            ) : (
              ""
            )}
            <UserInterests user={user} />
            <UserPlayedGames user={user} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  } else if (!userFound) {
    return (
      <div className="search-users-input">
        <Container>
          <Row>
            <h1>Search for other gamers!</h1>
            <Form onSubmit={handleSearchUser} className="d-flex">
              <Form.Control
                type="text"
                placeholder="Email Address"
                onChange={(e) => setUserEmail(e.target.value)}
                id="search-users-bar"
              />
              <Form.Text className="text-muted"></Form.Text>
              <Button variant="secondary" type="submit" className="form-button">
                Search
              </Button>
            </Form>
          </Row>
        </Container>
        {showMessage.show ? (
          <Alert variant={showMessage.type}> {showMessage.message}</Alert>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default SearchUsers;
