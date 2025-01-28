import React from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import VideoGameContainer from "../common/videoGameCard/VideoGameContainer";
import useQueryUserInfo from "../../hooks/useQueryUserInfo";
import useQueryUserGames from "../../hooks/useQueryUserGames";
import useMutateFollowUser from "../../hooks/useMutateFollowUser";
import useMutateUnfollowUser from "../../hooks/useMutateUnfollowUser";
import useQueryUserFollows from "../../hooks/useQueryUserFollows";
import { selectId } from "../../redux/slices/followSlice";

function FollowGames() {
  const followUserId = useSelector(selectId);

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

  const followsQuery = useQueryUserFollows();
  const follows = followsQuery.isSuccess ? followsQuery?.data?.data?.data : [];

  const followButton = !!!follows?.filter((user) => user.id === followUserId);

  const handleFollow = (e) => {
    e.preventDefault();

    followUser.mutate(followUserId);
  };

  const handleUnfollow = (e) => {
    e.preventDefault();

    unfollowUser.mutate(followUserId);
  };

  return (
    <div className="user-profile">
      {followingUserQuery.isSuccess && (
        <>
          <h1> Welcome to {followingUser?.firstName}'s library!</h1>
          <div id="follow-button-on-dashboard">
            {followButton ? (
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

export default FollowGames;
