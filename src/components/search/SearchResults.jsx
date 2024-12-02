import { React, useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import VideoGameContainer from "../common/videoGame/VideoGameContainer";

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const gameName = searchParams.get("gameName");
  let url = `/search/games?gameName=${gameName}`;
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setGames(result.data);
      });
  }, [gameName]);

  return (
    <div id="search-games-results">
      <div id="search-results-count">
        {games.length} search results were found.
      </div>
      <VideoGameContainer games={games} />
    </div>
  );
}

export default SearchResults;
