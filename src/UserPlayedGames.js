import VideoGameContainer from "./VideoGameContainer.js";
import { React, useState, useEffect } from "react";

function UserPlayedGames({ user }) {
  const [gamesPlayed, setGamesPlayed] = useState([]);

  useEffect(() => {
    fetch("/user/played", {
      headers: {
        User: JSON.stringify(user),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setGamesPlayed(result.games);
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
