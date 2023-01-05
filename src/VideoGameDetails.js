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


function VideoGameDetails({loggedIn, user}){

    const [game, setGame] = useState({});
    const {game_id}  = useParams();
    const userGame = {'user_id': user.id, 'game_id': game_id}
    const [score, setScore] = useState();
    const [showMessage, setShowMessage] = useState({'show': false,
                                                    'message': ''});


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
            } else {
                setShowMessage({'show': true,
                                'message': 'Interest already exists'});
            };
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
            } else {
                setShowMessage({'show': true,
                                'message': 'GamePlayed already exists'});
            };
            });
    };


    const handleRating = (e) => {
        userGame['score'] = score;

        fetch(`/api/games/${game_id}/create/rating`, {method: 'POST',
                                                body:JSON.stringify(userGame),
                                                headers: {'Content-Type': 'application/json',
                                            }})
        .then(setShowMessage({'show': true,
                    'message': 'Rating was made'}));
    };


    if (loggedIn) {
        return(
            <Container className="game-detail">
                <Row>
                    <Details game={game} />
                    <Col className="align-self-start">
                        <div className="game-selection" >
                            {showMessage.show ? <Alert variant="secondary" size="sm" >
                                {showMessage.message}
                            </Alert> : ''}
                            <div className="game-options">
                            <Button variant="secondary" size="sm" onClick={(e) => handleInterests()}>Interested</Button> {' '}
                            <Button variant="secondary" size="sm" onClick={(e) => handlePlayed()}>Played</Button>
                            </div>
                            <div>
                            <Form onSubmit={handleRating}> Rate this video game:
                                <Form.Select className="w-1" size="sm" onChange={(e) => setScore(e.target.value)}>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                </Form.Select>
                                <Button variant="light" size="sm"type="submit">
                                    Submit
                                </Button>
                            </Form>
                            </div>
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