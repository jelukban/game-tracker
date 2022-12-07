import React from 'react';
import { Link, BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

function VideoGame({game_id, cover_url, name, release_date, genres, platforms}) {

    return (
        <React.Fragment>
                <Link to={`/games/details/${game_id}`} >
                <div >
                    <p>{name}</p>
                    <img src={cover_url} height="128" width="90" ></img>
                    <div>
                        Genres: {genres?.map(genre => <div>{genre}</div>)}
                    </div>
                    <div>
                        Platforms: {platforms?.map(platform => <div>{platform}</div>)}
                    </div>
                    <p> Release Date: {release_date}</p>
                </div>
                </Link>
    </React.Fragment>
    );
};

export default VideoGame;