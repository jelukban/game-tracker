import VideoGameContainer from './VideoGameContainer.js'

function GamePage ({games}) {
    return (
        <div>
            <VideoGameContainer games={games} />
        </div>
    );
};

export default GamePage;