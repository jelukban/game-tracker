import { React, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Details from './Details.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function VideoGameDetails({loggedIn, user}){

    const [game, setGame] = useState({});
    const {game_id}  = useParams();
    const userGame = {'user_id': user.id, 'game_id': game_id}
    const [score, setScore] = useState();


    useEffect(() => {
        fetch(`/api/games/${game_id}/details`)
        .then((response) => response.json())
        .then((result) => {
            result.genres = result.genres.replaceAll(`'`, ``).replace(`\[`, '').replace(`\]`, '').split(',');
            result.platforms = result.platforms.replaceAll(`'`, ``).replace(`\[`, '').replace(`\]`, '').split(',');
            result.release_date = result.release_date.slice(0,-9);
            if (result.description === 'None') {
                result.description = '';
            };
            setGame(result);
        });
    }, []);


    const handleInterests = () => {
        fetch(`/api/games/${game_id}/create/interest`, {method: 'POST',
                                    body:JSON.stringify(userGame),
                                    headers: {'Content-Type': 'application/json',
                                }})
        .then((response) => response.json())
        .then((result) => {
            if (result.status === 'Interest made') {
            alert('Interest made');
        } else {
            alert('Interest already exists');
        };
        });
    };


    const handlePlayed = () => {
        fetch(`/api/games/${game_id}/create/played`, {method: 'POST',
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

        fetch(`/api/games/${game_id}/create/rating`, {method: 'POST',
                                                body:JSON.stringify(userGame),
                                                headers: {'Content-Type': 'application/json',
                                            }})
        .then(alert('Rating was made'));
    };


    if (loggedIn) {
        return(
            <Container className="game-detail">
                <Row>
                    <Details game={game} />
                    <Col>
                        <div className="game-selection" >
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
                    </Col>
                </Row>
            </Container>
        );
    } else {
        return(
            <Container className="game-detail ">
                <Row>
                    <Details game={game} />
                </Row>
            </Container>
        );
    };

};

export default VideoGameDetails;