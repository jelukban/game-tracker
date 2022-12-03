import VideoGame from './VideoGame.js';

function VideoGameContainer({games, count}) {

    return (
            <div className="grid">
                {games.slice(0,count).map(game => <VideoGame game_id={game.id}
                                            cover_url={game.cover_url}
                                            name={game.name}
                                            release_date={game.release_date}/>)}
            </div>
    );
};

export default VideoGameContainer;