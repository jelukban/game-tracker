import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserInterests from "./UserInterests.js";
import UserPlayedGames from "./UserPlayedGames.js";
import Button from "react-bootstrap/Button";

function FollowGames(userId) {
  const { followUserId } = useParams();
  const [followUser, setFollowUser] = useState({});
  const [followUserLoaded, setFollowUserLoaded] = useState(false);
  const [userFollowStatus, setUserFollowStatus] = useState(true);

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
          setFollowUser(result);
          setFollowUserLoaded(true);
        }
      });
  }, []);

  const handleFollow = (e) => {
    e.preventDefault();

    fetch("/follow", {
      method: "PUT",
      body: JSON.stringify({
        followUserId: userId.userId,
        followingUserId: followUserId,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "Follow was made!") {
          setUserFollowStatus(true);
        }
      });
  };

  const handleUnfollow = (e) => {
    e.preventDefault();

    fetch("/unfollow", {
      method: "PUT",
      body: JSON.stringify({
        followUserId: userId.userId,
        followingUserId: followUserId,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "Follow deleted") {
          setUserFollowStatus(false);
        }
      });
  };

  if (followUserLoaded) {
    return (
      <div className="user-profile">
        <h1> Welcome to {followUser.firstName}'s library!</h1>
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
        <UserInterests user={followUser} />
        <UserPlayedGames user={followUser} />
      </div>
    );
  }
}

export default FollowGames;
