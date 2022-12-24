import { Link, BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

function VideoGame({game_id, cover_url, name, release_date, genres, platforms}) {

    return (
        <Link to={`/games/details/${game_id}`} >
            <p>{name}</p>
            <img src={cover_url} height="128" width="90" ></img>
                Genres: {genres?.map(genre => <div className="game-genre">{genre}</div>)}
                Platforms: {platforms?.map(platform => <div className="game-platform">{platform}</div>)}
            <p> Release Date: {release_date}</p>
        </Link>
    );
};

export default VideoGame;