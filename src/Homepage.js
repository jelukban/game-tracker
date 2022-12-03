import VideoGameContainer from './VideoGameContainer.js'

function Homepage ({games}) {
    return (
        <div>
            <VideoGameContainer games={games}
                                count={50} />
        </div>
    );
};

export default Homepage;