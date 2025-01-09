import { React } from "react";
import useQueryUserGames from "../../hooks/useQueryUserGames";
import VideoGameContainer from "../common/videoGame/VideoGameContainer";

function UserPlayedGames(props) {
  const gamesQuery = useQueryUserGames("played");
  const games = gamesQuery.isSuccess ? gamesQuery?.data?.data?.data : [];

  return (
    <div>
      <h1>Played Games</h1>
      <VideoGameContainer games={games} />
    </div>
  );
}

export default UserPlayedGames;
