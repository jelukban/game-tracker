function Details({game}){

    return (
        <div>
            <h1 className="video-game-title"> {game.name}</h1>
            <img src={game.cover_url} height="128" width="90"></img>
            <p>Rating: {game.score ? game.score : 'NA'}</p>
            <p> Release Date: {game.release_date}</p>
            <div>
                Genres: {game.genres?.map(genre => <div>{genre}</div>)}
            </div>
            <div>
                Platforms: {game.platforms?.map(platform => <div>{platform}</div>)}
            </div>
            <p> Description: {game.description}</p>
        </div>
    );
};

export default Details;