import GenrePlatform from './GenrePlatform.js'

function Details({game, genres, platforms}){
    return (
        <div>
            <h1 className="video-game-title"> {game.name}</h1>
            <img src={game.cover_url} height="128" width="90"></img>
            <p> Release Date: {game.release_date}</p>
            <div>
                Genres: {genres.map(genre => <GenrePlatform items={genre} />)}
            </div>
            <div>
                Platforms: {platforms.map(platform => <GenrePlatform items={platform}/>)}
            </div>
            <p> Description: {game.description}</p>
        </div>
    );
};

export default Details;