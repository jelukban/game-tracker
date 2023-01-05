import VideoGameContainer from './VideoGameContainer.js';
import { React, useState, useEffect } from 'react';

function UserInterests({user}) {
    const [interestingGames, setInterestingGames] = useState([]);

    useEffect(() => {
        fetch('/api/dashboard/interests', { method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json',
            }})
        .then((response) => response.json())
        .then((result) => {
            setInterestingGames(result.games);
        });
    }, []);

    return(
            <div>
                <h1>Interests</h1>
                <VideoGameContainer games={interestingGames} />
            </div>
    );
};

export default UserInterests;