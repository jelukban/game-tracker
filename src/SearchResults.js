import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoGameContainer from "./components/VideoGameContainer.js";

function SearchResults() {
  const { queryString } = useParams();
  let url = `/search/games?${queryString}`;
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setGames(result.data);
      });
  }, [queryString]);

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
