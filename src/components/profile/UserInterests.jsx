import { React } from "react";
import VideoGameContainer from "../common/videoGameCard/VideoGameContainer";
import useQueryUserGames from "../../hooks/useQueryUserGames";

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
