import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Button, Form, Modal, Container, Row } from "react-bootstrap";
import secureLocalStorage from "react-secure-storage";
import { useQueryClient } from "@tanstack/react-query";
import VideoGameContainer from "../common/videoGameCard/VideoGameContainer";
import useQueryUserGames from "../../hooks/useQueryUserGames";
import useMutateFollowUser from "../../hooks/useMutateFollowUser";
import useMutateUnfollowUser from "../../hooks/useMutateUnfollowUser";

function SearchUsers() {
  const queryClient = useQueryClient();

  const followerUserInfo = JSON.parse(secureLocalStorage.getItem("user"))
    ? JSON.parse(secureLocalStorage.getItem("user"))
    : undefined;

  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState(null);
  const [followStatus, setFollowStatus] = useState(null);

  const interestQuery = useQueryUserGames("interests", user?.id);
  const playedQuery = useQueryUserGames("played", user?.id);

  const interests = interestQuery?.isSuccess
    ? interestQuery?.data?.data?.data
    : null;

  const played = playedQuery?.isSuccess ? playedQuery?.data?.data?.data : null;

  const followUser = useMutateFollowUser();
  const unfollowUser = useMutateUnfollowUser();

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSearchUser = async (e) => {
    e.preventDefault();

    try {
      const data = await queryClient.fetchQuery({
        queryKey: ["followUser"],
        queryFn: () => {
          const data = axios.get(
            `/search/user?${new URLSearchParams({
              email: e.target[0].value,
            }).toString()}`,
            {
              headers: {
                User: followerUserInfo.id,
                "Content-Type": "application/json",
              },
            }
          );
          return data;
        },
      });

      setUser(data?.data?.data);
      setOpenModal(true);
      setFollowStatus(data?.data?.data?.follow_status === "true");
    } catch (error) {
      if (error?.status === 404) {
        toast.error("User not found");
      }
    }
  };

  const handleFollow = (e) => {
    e.preventDefault();

    followUser.mutate(user?.id);
    setFollowStatus(true);
  };

  const handleUnfollow = (e) => {
    e.preventDefault();

    unfollowUser.mutate(user?.id);
    setFollowStatus(false);
  };

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
      <Modal
        show={openModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>Welcome to {user?.firstName}'s library!</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="follow-button">
            {!followStatus ? (
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
          {interestQuery.isSuccess && (
            <div>
              <h1>Interests</h1>
              <VideoGameContainer games={interests} />
            </div>
          )}
          {playedQuery?.isSuccess && (
            <div>
              <h1>Games Played</h1>
              <VideoGameContainer games={played} />
            </div>
          )}
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
