import React from 'react';
import { Link, BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

function VideoGame({game_id, cover_url, name, release_date}) {

    return (
        <React.Fragment>
                <Link to={`/games/details/${game_id}`} >
                <div key={"{game_id}"} >
                    <p>{name}</p>
                    <img src={cover_url} height="128" width="90" ></img>
                    <p> Genres: </p>
                    <p> Platforms: </p>
                    <p> Release Date: {release_date}</p>
                </div>
                </Link>
    </React.Fragment>
    );
};

export default VideoGame;