import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import secureLocalStorage from "react-secure-storage";
import useQueryUserGames from "../../hooks/useQueryUserGames";
import VideoGameContainer from "../common/videoGameCard/VideoGameContainer";
import { selectId } from "../../redux/slices/followSlice";

function FollowGames() {
  const user = JSON.parse(secureLocalStorage.getItem("user"));

  const [state, setState] = useState({
    followUser: {},
    followUserLoaded: false,
    userFollowStatus: true,
  });

  const followUserId = useSelector(selectId);

  const { followUser, followUserLoaded, userFollowStatus } = state;

  const interestQuery = useQueryUserGames("interests", followUserId);
  const playedQuery = useQueryUserGames("played", followUserId);

  const interests = interestQuery?.isSuccess
    ? interestQuery?.data?.data?.data
    : null;

  const played = playedQuery?.isSuccess ? playedQuery?.data?.data?.data : null;

  console.log({ interestQuery, interests, playedQuery, played });
  useEffect(() => {
    let queryString = new URLSearchParams({
      id: followUserId,
    }).toString();
    let url = `/search/user?${queryString}`;

    fetch(url, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.state !== "Account not found") {
          setState({ ...state, followUser: result, followUserLoaded: true });
        }
      });
  }, []);

  const handleFollow = (e) => {
    e.preventDefault();

    fetch("/follow", {
      method: "PUT",
      body: JSON.stringify({
        followUserId: user.id,
        followingUserId: followUserId,
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
        followUserId: user.id,
        followingUserId: followUserId,
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

  if (followUserLoaded) {
    return (
      <div className="user-profile">
        <h1> Welcome to {followUser.data.firstName}'s library!</h1>
        <div id="follow-button-on-dashboard">
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
      </div>
    );
  }
}

export default FollowGames;
