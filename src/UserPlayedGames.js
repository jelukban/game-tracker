import VideoGameContainer from './VideoGameContainer.js';
import { React, useState, useEffect } from 'react';

function UserPlayedGames({user}) {
    const [gamesPlayed, setGamesPlayed] = useState([]);


    useEffect(() => {
        fetch('/api/dashboard/played', { method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json',
            }})
        .then((response) => response.json())
        .then((result) => {
            setGamesPlayed(result.games);
        });
    }, []);

    return(
            <div>
                <h1>Played Games</h1>
                <VideoGameContainer games={gamesPlayed} />
            </div>
    );
};


export default UserPlayedGames;