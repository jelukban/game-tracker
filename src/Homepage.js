import VideoGameContainer from './VideoGameContainer.js'

function Homepage ({games}) {
    return (
        <div>
            <VideoGameContainer games={games} />
        </div>
    );
};

export default Homepage;