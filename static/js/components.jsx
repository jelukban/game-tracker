'use strict';

function VideoGame({name, description}) {
    return (
    <div class="video-game">
        <p> {name}</p>
        <p> {description} </p>
    </div>
    );
};

function VideoGameContainer() {

    const [games, setGames] = React.useState([]);
    const videoGames = [];

    for (const currentGame of games) {
        videoGames.push(<VideoGame name={})
    };
};