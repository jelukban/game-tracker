import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInterests from "../profile/UserInterests.js";
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

  const [state, setState] = useState({
    userEmail: "",
    user: {},
    userFound: false,
    showMessage: {
      show: false,
      message: "",
      type: "",
    },
    showModal: false,
    showModalMessage: {
      show: false,
      message: "",
      type: "",
    },
    userFollowStatus: false,
  });

  const {
    userEmail,
    user,
    userFound,
    showMessage,
    showModal,
    showModalMessage,
    userFollowStatus,
  } = state;

  const handleClose = () => {
    setState({
      ...state,
      showModalMessage: { show: false, message: "", type: "" },
      showModal: false,
    });
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
        if (result.message !== "Account not found") {
          setState({
            ...state,
            user: {
              id: result.data.id,
              firstName: result.data.firstName,
              lastName: result.data.lastName,
              email: result.data.email,
            },
            userFound: true,
            showModal: true,
            userFollowStatus: result.data.follow_status === "true",
          });
        } else {
          setState({
            ...state,
            showMessage: {
              show: true,
              message: "Email was not found",
              type: "danger",
            },
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
          setState({ ...state, userFollowStatus: true });
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
          setState({ ...state, userFollowStatus: false });
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
                onChange={(e) =>
                  setState({ ...state, userEmail: e.target.value })
                }
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
          show={showModal}
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
                onChange={(e) =>
                  setState({ ...state, userEmail: e.target.value })
                }
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
