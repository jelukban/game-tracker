import { React, useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import VideoGameContainer from "../videoGame/VideoGameContainer.js";

function UserPlayedGames(props) {
  const [gamesPlayed, setGamesPlayed] = useState([]);
  let { user } = props;

  if (!user) {
    user = JSON.parse(secureLocalStorage.getItem("user"))
      ? JSON.parse(secureLocalStorage.getItem("user"))
      : undefined;
  }

  useEffect(() => {
    fetch("/user/played", {
      headers: {
        User: JSON.stringify(user),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setGamesPlayed(result.data);
      });
  }, []);

  return (
    <div>
      <h1>Played Games</h1>
      <VideoGameContainer games={gamesPlayed} />
    </div>
  );
}

export default UserPlayedGames;
