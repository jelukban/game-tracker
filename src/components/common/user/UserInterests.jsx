import { React } from "react";
import useQueryUserGames from "../../../hooks/useQueryUserGames";
import VideoGameContainer from "../videoGame/VideoGameContainer";

function UserInterests() {
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
