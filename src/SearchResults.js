import GamePage from './GamePage.js';


function SearchResults ({games}) {

    return (
        <div id="search-games-results">
            <div id="search-results-count">
                {games.length} search results were found.
            </div>
            <GamePage games={games} />
        </div>
    );
};

export default SearchResults;