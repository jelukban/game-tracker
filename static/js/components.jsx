'use strict';

function VideoGame({cover_url, name, description, release_date}) {
    return (
    <div className="video-game">
        <img src={cover_url} height="128" width="90"></img>
        <p className="video-game-title"> {name}</p>
        <p> {description} </p>
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

    const videoGames = [];

    let i = 0
    if (count !== 0) {
        for (const currentGame of games) {
            videoGames.push(
                <VideoGame
                cover_url={currentGame.cover_url}
                name={currentGame.name}
                decription={currentGame.description}
                release_date={currentGame.release_date}
                />
            );
            i++;
            if (i === 50) {
                break;
                };
            };
        };

    return (
        <React.Fragment>
            <button onClick={() => setCount(50)}> 50 </button>
            <button onClick={() => setCount(100)}> 100 </button>
            <div className="grid">{videoGames}</div>
        </React.Fragment>
    );
}