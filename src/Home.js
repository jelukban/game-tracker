import GamePage from './GamePage.js';

function Home ({games}) {
    return (<div id="homepage">
                <h1> Welcome to your gaming library!</h1>
                <GamePage games={games} />
            </div>
    );
};

export default Home;