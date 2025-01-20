import { Link, BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import Button from "react-bootstrap/Button";

function VideoGameCard({
  game_id,
  cover_url,
  name,
  release_date,
  genres,
  platforms,
}) {
  return (
    <Link to={`/games/details/${game_id}`}>
      <img src={cover_url} className="small-cover"></img>
      <div className="general-game-description">
        <div className="title">{name}</div>
        <div className="description-titles">Genres:</div>
        <div className="genres">
          {genres?.map((genre, index) => (
            <Button
              variant="light"
              size="sm"
              className="game-genre"
              key={index}
            >
              {genre}
            </Button>
          ))}
        </div>
        <div className="description-titles">Platforms:</div>
        <div className="platforms">
          {platforms?.map((platform, index) => (
            <Button
              variant="light"
              size="sm"
              className="game-platform"
              key={index}
            >
              {platform}
            </Button>
          ))}
        </div>
        <div className="description-titles">Release Date:</div>
        <div className="release-date">
          {release_date !== "None"
            ? release_date.slice(0, -9)
            : "Not available"}
        </div>
      </div>
    </Link>
  );
}

export default VideoGameCard;
