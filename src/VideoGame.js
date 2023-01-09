import { Link, BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function VideoGame({game_id, cover_url, name, release_date, genres, platforms}) {

    return (
        <Link to={`/games/details/${game_id}`} >
            <img src={cover_url}  className="small-cover"></img>
            <div className="general-game-description">
                <div className="title">{name}</div>
                <div className="description-titles">Genres: </div> <div className="genres">{genres?.map(genre => <Button variant="light" size="sm" className="game-genre">{genre}</Button>)}</div>
                <div className="description-titles">Platforms: </div> <div className="platforms">{platforms?.slice(0, 6).map(platform => <Button variant="light" size="sm" className="game-platform">{platform}</Button>)}</div>
                <div className="description-titles">Release Date: </div><div className="release-date">{release_date !== 'None' ? release_date.slice(0, -9) : 'Not available'}</div>
            </div>

        </Link>
    );
};

export default VideoGame;