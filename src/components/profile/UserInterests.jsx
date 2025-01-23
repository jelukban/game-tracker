import { React } from "react";
import VideoGameContainer from "../common/videoGameCard/VideoGameContainer";
import useQueryUserGames from "../../hooks/useQueryUserGames";
import secureLocalStorage from "react-secure-storage";

function UserInterests() {
  const user = JSON.parse(secureLocalStorage.getItem("user"));

  const gamesQuery = useQueryUserGames("interests", user?.id);
  const games = gamesQuery.isSuccess ? gamesQuery?.data?.data?.data : [];

  return (
    <div>
      <h1>Interests</h1>
      <VideoGameContainer games={games} />
    </div>
  );
}

export default UserInterests;
