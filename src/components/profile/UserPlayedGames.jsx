import { React } from "react";
import useQueryUserGames from "../../hooks/useQueryUserGames";
import VideoGameContainer from "../common/videoGameCard/VideoGameContainer";
import secureLocalStorage from "react-secure-storage";

function UserPlayedGames() {
  const user = JSON.parse(secureLocalStorage.getItem("user"));

  const gamesQuery = useQueryUserGames("played", user?.id);
  const games = gamesQuery.isSuccess ? gamesQuery?.data?.data?.data : [];

  return (
    <div>
      <h1>Played Games</h1>
      <VideoGameContainer games={games} />
    </div>
  );
}

export default UserPlayedGames;
