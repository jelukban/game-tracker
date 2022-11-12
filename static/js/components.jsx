'use strict';

function VideoGame({game_image, name, description, release_date}) {
    return (
    <div className="video-game">
        <p> Game Image goes here {game_image}</p>
        <p> {name}</p>
        <p> {description} </p>
        <p> {release_date}</p>
    </div>
    );
};


function VideoGameContainer() {

    const [games, setGames] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/games')
        .then((response) => response.json())
        .then((responseJson) => setGames(responseJson.games))
    }, []);

    const videoGames = [];

    for (const currentGame of games) {
        videoGames.push(
            <VideoGame
            game_image={currentGame.game_image}
            name={currentGame.name}
            decription={currentGame.description}
            release_date={currentGame.release_date}
            />
        );
    };

    return (
        <React.Fragment>
            <h2> Video Games </h2>
            <div className="grid">{videoGames}</div>
        </React.Fragment>
    );
}