import { React, useEffect, useParams, useState } from "react";
import VideoGame from "../common/videoGame/VideoGameCard";
import Carousel from "react-bootstrap/Carousel";
import secureLocalStorage from "react-secure-storage";

function UserRecommendations() {
  const user = JSON.parse(secureLocalStorage.getItem("user"))
    ? JSON.parse(secureLocalStorage.getItem("user"))
    : undefined;

  const [state, setState] = useState({
    games: [],
    index: 0,
  });

  const { games, index } = state;

  const handleSelect = (selectedIndex, e) => {
    setState({ ...state, index: selectedIndex });
  };

  useEffect(() => {
    fetch(`/user/recommendations`, {
      headers: {
        User: JSON.stringify(user),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setState({ ...state, games: responseJson.data });
      });
  }, []);

  return (
    <div className="recommends-background">
      <h1 className="recommend-title"> Your recommendations </h1>
      <div className="recommended-games">
        <Carousel activeIndex={index} onSelect={handleSelect} variant="dark">
          {games.map((game, idx) => (
            <Carousel.Item key={idx}>
              <VideoGame
                game_id={game.id}
                cover_url={game.cover_url}
                name={game.name}
                release_date={game.release_date}
                genres={game.genres}
                platforms={game.platforms}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default UserRecommendations;
