import VideoGameContainer from "../common/videoGame/VideoGameContainer";
import useQueryGames from "../../hooks/useQueryGames";
import LoadSpinner from "../common/LoadSpinner.jsx";

function Explore() {
  const gamesQuery = useQueryGames();
  const games = gamesQuery.isSuccess ? gamesQuery?.data?.data?.data : [];

  return (
    <div id="homepage">
      <h1> Find Your Next Adventure </h1>
      {gamesQuery.isLoading ? (
        <LoadSpinner />
      ) : (
        <VideoGameContainer games={games} />
      )}
    </div>
  );
}

export default Explore;
