import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import React from 'react';

function Details({game}){


    return (
        <React.Fragment>
            <h1 className="video-game-title"> {game.name}</h1>
            <Col className="align-self-center">
                <img src={game.cover_url} height="355" width="265"></img>
            </Col>
            <Col className="align-self-start">
                <div className="description-titles">Genres: </div> <div className="genres">{game.genres?.map(genre => <Button variant="light" size="sm" className="game-genre">{genre}</Button>)}</div>
                <div className="description-titles">Platforms: </div> <div className="platforms">{game.platforms?.map(platform => <Button variant="light" size="sm" className="game-platform">{platform}</Button>)}</div>
                <div className="description-titles">Release Date: </div><div className="release-date">{game.release_date}</div>
                <p className="game-description"> {game.description}</p>
            </Col>
            <Col className="align-self-start">
                <p>Rating: {game.score ? game.score : 'NA'}</p>
            </Col>
        </React.Fragment>
    );
};

export default Details;