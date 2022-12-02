import VideoGame from './VideoGame.js';

function VideoGameContainer({games}) {
    return (
            <div className="grid">
                {games.map(game => <VideoGame game_id={game.id}
                                            cover_url={game.cover_url}
                                            name={game.name}
                                            release_date={game.release_date}/>)}
            </div>
    );
};

export default VideoGameContainer;