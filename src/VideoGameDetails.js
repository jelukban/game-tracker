import {React, useEffect, useState} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Details from './Details.js';

function VideoGameDetails({loggedIn, user}){

    const [game, setGame] = useState('');
    const {game_id}  = useParams();

    const userGame = {'user_id': user.id, 'game_id': game_id}


    useEffect(() => {
        fetch(`/api/games/details/${game_id}`)
        .then((response) => response.json())
        .then((result) => {
            setGame(result);
        });
    }, []);


    const handleInterests = (game_id) => {
        fetch('/api/createinterest', {method: 'POST',
                                    body:JSON.stringify(userGame),
                                    headers: {'Content-Type': 'application/json',
                                }})
        .then(console.log('Your game was added!'));
    };


    const handlePlayed = (game_id) => {
        fetch('/api/createplayed', {method: 'POST',
                                    body:JSON.stringify(userGame),
                                    headers: {'Content-Type': 'application/json',
                                }})
        .then(console.log('Your game was added!'));
    };


    if (loggedIn) {
        return(
            <div>
                <Details game={game} />
                <div>
                    <button onClick={(e) => handleInterests(game_id)} id="interested"> Interested</button>
                    <button onClick={(e) => handlePlayed(game_id)} id="played"> Played</button>
                </div>
            </div>
        );
    } else {
        return(
            <Details game={game} />
        );
    };

};

export default VideoGameDetails;