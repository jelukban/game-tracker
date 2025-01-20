import React, { useState, useEffect } from "react";
import UserInterests from "../common/user/UserInterests";
import UserPlayedGames from "../common/user/UserPlayedGames";
import { Button, Form, Alert, Modal, Container, Row } from "react-bootstrap";
import secureLocalStorage from "react-secure-storage";
import useQuerySearchUsers from "../../hooks/useQuerySearchUsers";

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
    // userEmail,
    // user,
    // userFound,
    showMessage,
    // showModal,
    showModalMessage,
    userFollowStatus,
  } = state;

  const handleClose = () => {
    setState({
      ...state,
      showModalMessage: { show: false, message: "", type: "" },
      showModal: false,
    });

    // setShowModal(false);
    setQueryString("");
  };

  const [queryString, setQueryString] = useState("");

  const handleSearchUser = (e) => {
    e.preventDefault();
    setQueryString(
      new URLSearchParams({
        email: e.target[0].value,
      }).toString()
    );
  };

  const searchQuery = useQuerySearchUsers(queryString);
  const user = searchQuery.isSuccess ? searchQuery?.data?.data?.data : {};
  const userFound = user?.status === "Account found!";

  console.log({ queryString, userFound, searchQuery });
  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   if (searchQuery.isSuccess && queryString) {
  //     setShowModal(true);
  //   }
  // }, [searchQuery]);

  // useEffect(() => {
  //   if (searchQuery.isSuccess && accountFound !== "Account not found") {
  //     setState({
  //       ...state,
  //       showModal: true,
  //       userFollowStatus: user.follow_status === "true",
  //     });
  //   }
  //   else if (searchQuery.isSuccess && accountFound === "Account not found") {
  //     setState({
  //       ...state,
  //       showMessage: {
  //         show: true,
  //         message: "Email was not found",
  //         type: "danger",
  //       },
  //     });
  //   }
  // }, [searchQuery, queryString]);
  console.log({ userFound });
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
  console.log(showModal);
  return (
    <div className="search-users-input">
      <Container>
        <Row>
          <h1>Search for other gamers!</h1>
          <Form onSubmit={handleSearchUser} className="d-flex">
            <Form.Control
              type="text"
              placeholder="Email Address"
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
        show={userFound && queryString}
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
}

export default SearchUsers;
