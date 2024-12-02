import VideoGameContainer from "../common/videoGame/VideoGameContainer";
import LoadSpinner from "../common/LoadSpinner.jsx";

function Explore() {
  return (
    <div id="homepage">
      <h1> Find Your Next Adventure </h1>
      <VideoGameContainer url="/games" />
    </div>
  );
}

export default Explore;
