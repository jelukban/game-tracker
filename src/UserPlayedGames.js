import VideoGameContainer from './VideoGameContainer.js';
import {React, useState, useEffect} from 'react';

function UserPlayedGames({user}) {
    const [gamesPlayed, setGamesPlayed] = useState([]);


    useEffect(() => {
        fetch('/api/games/gamesplayed', { method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json',
            }})
        .then((response) => response.json())
        .then((result) => {
            setGamesPlayed(result.games);
        });
    }, []);

    return(
            <div> These are the games you played!
                <VideoGameContainer games={gamesPlayed}
                                    count={100} />
            </div>
    );
};


export default UserPlayedGames;