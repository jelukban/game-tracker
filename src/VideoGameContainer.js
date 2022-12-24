import VideoGame from './VideoGame.js';
import { useState } from 'react';

function VideoGameContainer({games}) {
    return (
            <div className="grid">
            {games.map(game => <div key={game.id} className="game"><VideoGame game_id={game.id}
                                    cover_url={game.cover_url}
                                    name={game.name}
                                    release_date={game.release_date}
                                    genres={game.genres.replaceAll(`'`, ``).replace(`\[`, '').replace(`\]`, '').split(',')}
                                    platforms={game.platforms.replaceAll(`'`, ``).replace(`\[`, '').replace(`\]`, '').split(',')}/></div>)}
            </div>
    );
};

export default VideoGameContainer;