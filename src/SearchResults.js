import VideoGameContainer from "./VideoGameContainer.js";

function SearchResults({ games }) {
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
