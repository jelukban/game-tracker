import GamePage from './GamePage.js';


function Explore ({games}) {
    return (
        <div id="homepage">
            <h1> Find Your Next Adventure </h1>
            <GamePage games={games} />
        </div>
    );
};

export default Explore;