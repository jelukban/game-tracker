import {React, useEffect, useState} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Details from './Details.js';

function VideoGameDetails({loggedIn, user}){

    const [game, setGame] = useState({});
    const {game_id}  = useParams();
    const userGame = {'user_id': user.id, 'game_id': game_id}
    const [score, setScore] = useState();


    useEffect(() => {
        fetch(`/api/games/details/${game_id}`)
        .then((response) => response.json())
        .then((result) => {
            result.genres = result.genres.replaceAll(`'`, ``).replace(`\[`, '').replace(`\]`, '').split(',')
            result.platforms = result.platforms.replaceAll(`'`, ``).replace(`\[`, '').replace(`\]`, '').split(',')
            setGame(result);
        });
    }, []);


    const handleInterests = () => {
        fetch('/api/createinterest', {method: 'POST',
                                    body:JSON.stringify(userGame),
                                    headers: {'Content-Type': 'application/json',
                                }})
        .then((response) => response.json())
        .then((result) => {
        console.log(result);
            if (result.status === 'Interest made') {
            alert('Interest made');
        } else {
            alert('Interest already exists');
        };
        });
    };


    const handlePlayed = () => {
        fetch('/api/createplayed', {method: 'POST',
                                    body:JSON.stringify(userGame),
                                    headers: {'Content-Type': 'application/json',
                                }})
        .then((response) => response.json())
        .then((result) => { if (result.status === 'GamePlayed was made') {
            alert('GamePlayed was made');
        } else {
            alert('GamePlayed already exists!')
        };
        });
    };


    const handleRating = (e) => {
        e.preventDefault();

        userGame['score'] = score;

        fetch(`/api/${game_id}/createrating`, {method: 'POST',
                                                body:JSON.stringify(userGame),
                                                headers: {'Content-Type': 'application/json',
                                            }})
        .then(alert('Rating was made'));
    };


    if (loggedIn) {
        return(
            <div>
                <Details game={game} />
                <div>
                    <button onClick={(e) => handleInterests()}> Interested</button>
                    <button onClick={(e) => handlePlayed()}> Played</button>
                    <form id="rating" onSubmit={handleRating}>
                        <label htmlFor="rating-choices">Rate this video game:</label>
                        <select id="rating-choices" onChange={(e) => setScore(e.target.value)}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        );
    } else {
        return(
            <div>
                <Details game={game} />
            </div>
        );
    };

};

export default VideoGameDetails;