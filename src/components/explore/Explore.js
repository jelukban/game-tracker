import { useState, useEffect } from "react";
import VideoGameContainer from "../videoGame/VideoGameContainer.js";
import LoadSpinner from "../common/LoadSpinner.js";

function Explore() {
  const [games, setGames] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    fetch("/games")
      .then((response) => response.json())
      .then((responseJson) => {
        setGames(responseJson.data);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => setIsLoaded(false), 3500);
  }, [games]);

  return (
    <div>
      {isLoaded ? (
        <LoadSpinner />
      ) : (
        <div id="homepage">
          <h1> Find Your Next Adventure </h1>
          <VideoGameContainer games={games} />
        </div>
      )}
    </div>
  );
}

export default Explore;
