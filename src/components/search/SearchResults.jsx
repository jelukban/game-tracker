import React from "react";
import { useSearchParams } from "react-router-dom";
import VideoGameContainer from "../common/videoGame/VideoGameContainer";
import useQuerySearchGames from "../../hooks/useQuerySearchGames";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const searchQuery = useQuerySearchGames(searchParams.get("gameName"));

  const games = searchQuery.isSuccess ? searchQuery?.data?.data?.data : [];
  console.log(games);

  return (
    <div id="search-games-results">
      {searchQuery.isSuccess && (
        <>
          <div id="search-results-count">
            {games.length} search results were found.
          </div>
          <VideoGameContainer games={games} />
        </>
      )}
    </div>
  );
}

export default SearchResults;
