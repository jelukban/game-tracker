function Details({game}){
    return (
        <div>
            <h1 className="video-game-title"> {game.name}</h1>
            <img src={game.cover_url} height="128" width="90"></img>
            <p> Release Date: {game.release_date}</p>
            <p> Description: {game.description}</p>
        </div>
    );
};

export default Details;