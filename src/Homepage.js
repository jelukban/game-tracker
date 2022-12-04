import VideoGameContainer from './VideoGameContainer.js'

function Homepage ({games}) {
    return (
        <div>
            <VideoGameContainer games={games}
                                count={10} />
        </div>
    );
};

export default Homepage;