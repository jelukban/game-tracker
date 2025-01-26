import React from "react"; // , { useState, useEffect }
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import secureLocalStorage from "react-secure-storage";
import VideoGameContainer from "../common/videoGameCard/VideoGameContainer";
import useQueryUserInfo from "../../hooks/useQueryUserInfo";
import useQueryUserGames from "../../hooks/useQueryUserGames";
import useMutateFollowUser from "../../hooks/useMutateFollowUser";
import useMutateUnfollowUser from "../../hooks/useMutateUnfollowUser";

import { selectId } from "../../redux/slices/followSlice";

function FollowGames() {
  const user = JSON.parse(secureLocalStorage.getItem("user"));

  // const [state, setState] = useState({
  //   followUser: {},
  //   followUserLoaded: false,
  //   userFollowStatus: true,
  // });

  const followUserId = useSelector(selectId);

  // const { followUser, followUserLoaded, userFollowStatus } = state;

  const interestQuery = useQueryUserGames("interests", followUserId);
  const playedQuery = useQueryUserGames("played", followUserId);
  const followUser = useMutateFollowUser();
  const unfollowUser = useMutateUnfollowUser();

  const interests = interestQuery?.isSuccess
    ? interestQuery?.data?.data?.data
    : null;

  const played = playedQuery?.isSuccess ? playedQuery?.data?.data?.data : null;

  const followingUserQuery = useQueryUserInfo(followUserId);
  const followingUser = followingUserQuery?.isSuccess
    ? followingUserQuery?.data?.data?.data
    : null;

  const userFollowStatus = !!followingUser;

  const handleFollow = (e) => {
    e.preventDefault();

    followUser.mutate(followUserId);
    // fetch("/follow", {
    //   method: "PUT",
    //   body: JSON.stringify({
    //     followUserId: user.id,
    //     followingUserId: followUserId,
    //   }),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     if (result.message === "Follow was made!") {
    //       setState({ ...state, userFollowStatus: true });
    //     }
    //   });
  };

  const handleUnfollow = (e) => {
    e.preventDefault();

    unfollowUser.mutate(followUserId);
    // fetch("/unfollow", {
    //   method: "PUT",
    //   body: JSON.stringify({
    //     followUserId: user.id,
    //     followingUserId: followUserId,
    //   }),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     if (result.message === "Follow deleted") {
    //       setState({ ...state, userFollowStatus: false });
    //     }
    //   });
  };

  if (followingUserQuery?.isSuccess) {
    return (
      <div className="user-profile">
        {followingUserQuery.isSuccess && (
          <>
            <h1> Welcome to {followingUser?.firstName}'s library!</h1>
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
          </>
        )}
      </div>
    );
  }
}

export default FollowGames;
