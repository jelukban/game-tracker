import { React, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Details from './Details.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';


function VideoGameDetails({isLoggedIn, user}){

    const [game, setGame] = useState({});
    const {game_id}  = useParams();
    const userGame = {'user_id': user.id, 'game_id': game_id}
    const [score, setScore] = useState();
    const [showMessage, setShowMessage] = useState({'show': false,
                                                    'message': ''});
    const [gameStatus, setGameStatus] = useState({'interestStatus': false,
                                                'playedStatus': false})


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
                setShowMessage({'show': true,
                                'message': 'Interest made'});
                setGameStatus({...gameStatus, 'interestStatus': true});
            } else {
                setShowMessage({'show': true,
                                'message': 'Interest already exists'});
            };
        });
    };

    const deleteInterests = () => {
        fetch(`/api/games/${game_id}/interest`, {method: 'DELETE',
                                    body:JSON.stringify(userGame),
                                    headers: {'Content-Type': 'application/json',
                                }})
        .then((response) => response.json())
        .then((result)  => {if (result.status === 'Interest deleted') {
            setGameStatus({...gameStatus, 'interestStatus': false});
        }
        });
    };


    const handlePlayed = () => {
        fetch(`/api/games/${game_id}/create/played`, {method: 'POST',
                                    body:JSON.stringify(userGame),
                                    headers: {'Content-Type': 'application/json',
                                }})
        .then((response) => response.json())
        .then((result) => {
            if (result.status === 'GamePlayed was made') {
                setShowMessage({'show': true,
                                'message': 'GamePlayed was made'});
                setGameStatus({...gameStatus, 'playedStatus': true});
            } else {
                setShowMessage({'show': true,
                                'message': 'GamePlayed already exists'});
            };
        });
    };

    const deletePlayed = () => {
        fetch(`/api/games/${game_id}/played`, {method: 'DELETE',
                                    body:JSON.stringify(userGame),
                                    headers: {'Content-Type': 'application/json',
                                }})
        .then((response) => response.json())
        .then((result)  => {if (result.status === 'Game played deleted') {
            setGameStatus({...gameStatus, 'playedStatus': false});
        }
        });
    };


    const handleRating = (e) => {
        userGame['score'] = score;

        fetch(`/api/games/${game_id}/create/rating`, {method: 'POST',
                                                body:JSON.stringify(userGame),
                                                headers: {'Content-Type': 'application/json',
        }})
    };


    if (isLoggedIn) {
        return(
            <Container className="game-detail">
                <Row>
                    <Details game={game} />
                    <Col className="align-self-start">
                        <div className="game-selection" >
                            {showMessage.show ? <Alert variant="dark" size="sm" >
                                                    {showMessage.message}
                                                </Alert> : ''}
                            <div className="detail-title">
                                Track this game!
                            </div>
                            <div className="interest-played-button">
                                {gameStatus.interestStatus ? <Button variant="secondary"
                                                                    size="sm"
                                                                    onClick={(e) => deleteInterests()}
                                                                    className="form-button" >
                                                                    Uninterest
                                                            </Button> :
                                                            <Button variant="secondary"
                                                                    size="sm"
                                                                    onClick={(e) => handleInterests()}
                                                                    className="form-button" >
                                                                    Interest
                                                            </Button>} {' '}
                                {gameStatus.playedStatus ? <Button variant="secondary"
                                                                    size="sm"
                                                                    onClick={(e) => deletePlayed()}
                                                                    className="form-button" >
                                                                Unplayed
                                                            </Button> :
                                                            <Button variant="secondary"
                                                                    size="sm"
                                                                    onClick={(e) => handlePlayed()}
                                                                    className="form-button" >
                                                                Played
                                                            </Button> }
                            </div>
                            <Form onSubmit={handleRating}
                                    className="rating-form">
                                <div className="detail-title">
                                    Rate this video game:
                                </div>
                                <Form.Select className="rating-dropdown"
                                                size="sm"
                                                onChange={(e) => setScore(e.target.value)}
                                                autosize={false}>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                </Form.Select>
                                <Button variant="secondary"
                                            size="sm"
                                            type="submit"
                                            className="rating-button">
                                    Submit
                                </Button>
                            </Form>
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