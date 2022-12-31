import { React, useEffect, useParams, useState } from 'react';
import VideoGameContainer from './VideoGameContainer.js'

function UserRecommendations ({user}) {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch(`/api/dashboard/${user.id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            setGames(responseJson.games);
        });
    }, []);

    return (
        <div>
            <div className="user-recommendations">
                Here are your recommended games!
                <VideoGameContainer games={games} />
            </div>
        </div>
    );
};

export default UserRecommendations;