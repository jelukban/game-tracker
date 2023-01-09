import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import React from 'react';
import ReactStars from 'react-stars';

function Details({game}){


    return (
        <React.Fragment>
            <h1 className="video-game-title"> {game.name}</h1>
            <Col className="align-self-start">
                <img src={game.cover_url} height="375" width="280"></img>
            </Col>
            <Col className="align-self-start">
                <div className="description-titles">Genres: </div> <div className="genres">{game.genres?.map(genre => <Button variant="light" size="sm" className="game-genre">{genre}</Button>)}</div>
                <div className="description-titles">Platforms: </div> <div className="platforms">{game.platforms?.slice(0,6).map(platform => <Button variant="light" size="sm" className="game-platform">{platform}</Button>)}</div>
                <div className="description-titles">Release Date: </div><div className="release-date">{game.release_date !== '' ? game.release_date : 'Not available'}</div>
                <p className="game-description"> {game.description}</p>
            </Col>
            <Col className="align-self-start d-flex justify-content-center">
                <div> <div className="rating-title"> Rating</div>{game.score ? <ReactStars count={5}
                                                        value={game.score}
                                                        size={24}
                                                        edit={false}
                                                        color2={'#ffd700'}
                                                        className="rating-star"/> : <ReactStars count={5}
                                                                                            value={0}
                                                                                            size={24}
                                                                                            edit={false}
                                                                                            color2={'#ffd700'}
                                                                                            className="rating-star" /> }</div>
            </Col>
        </React.Fragment>
    );
};

export default Details;