import { React, useState } from "react";
import VideoGame from "../common/videoGameCard/VideoGameCard";
import useQueryUserGames from "../../hooks/useQueryUserGames";
import Carousel from "react-bootstrap/Carousel";

function UserRecommendations() {
  const [index, setIndex] = useState(0);

  const gamesQuery = useQueryUserGames("recommendations");
  const games = gamesQuery.isSuccess ? gamesQuery?.data?.data?.data : [];

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

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
