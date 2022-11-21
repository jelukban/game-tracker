'use strict';

function VideoGame({cover_url, name, release_date}) {
    return (
    <div className="video-game">
        <img src={cover_url} height="128" width="90"></img>
        <p className="video-game-title"> {name}</p>
        <p> Release Date: {release_date}</p>
    </div>
    );
};


function VideoGameContainer() {

    const [games, setGames] = React.useState([]);
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        fetch('/api/games')
        .then((response) => response.json())
        .then((responseJson) => setGames(responseJson.games))
    }, []);


    return (
        <React.Fragment>
            <div className="grid">
                {games.map(game => <VideoGame cover_url={game.cover_url}
                                            name={game.name}
                                            release_date={game.release_date} />)}
            </div>
        </React.Fragment>
    );
}


function VideoGameDetails({gameId}){

    const [game, setGame] = React.useState('')

    React.useEffect(() => {
        fetch(`/api/games/${gameId}`)
        .then((response) => response.json())
        .then((result) => {
            setGame(result);
        });
    }, []);

    return(
        <div>
            <h1 className="video-game-title"> {game.name}</h1>
            <img src={game.cover_url} height="128" width="90"></img>
            <p> Release Date: {game.release_date}</p>
            <p> Description: {game.description}</p>
        </div>
    );
};