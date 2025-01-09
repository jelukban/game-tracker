import { React } from "react";
import useQueryUserGames from "../../hooks/useQueryUserGames";
import VideoGameContainer from "../common/videoGame/VideoGameContainer";

function UserInterests(props) {
  const gamesQuery = useQueryUserGames("interests");
  const games = gamesQuery.isSuccess ? gamesQuery?.data?.data?.data : [];

  return (
    <div>
      <h1>Interests</h1>
      <VideoGameContainer games={games} />
    </div>
  );
}

export default UserInterests;
