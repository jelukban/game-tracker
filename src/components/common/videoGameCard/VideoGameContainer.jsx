import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VideoGameCard from "./VideoGameCard.jsx";

function VideoGameContainer({ games }) {
  const halfOfGames = Math.ceil(games?.length / 2);

  return (
    <>
      <Container fluid className="grid game-container">
        <Row>
          <Col>
            {games?.slice(0, halfOfGames).map((game) => (
              <div key={game.id} className="game">
                <VideoGameCard
                  game_id={game.id}
                  cover_url={game.cover_url}
                  name={game.name}
                  release_date={game.release_date}
                  genres={game.genres}
                  platforms={game.platforms}
                />
              </div>
            ))}
          </Col>
          <Col>
            {games?.slice(halfOfGames, games.length).map((game) => (
              <div key={game.id} className="game">
                <VideoGameCard
                  game_id={game.id}
                  cover_url={game.cover_url}
                  name={game.name}
                  release_date={game.release_date}
                  genres={game.genres}
                  platforms={game.platforms}
                />
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default VideoGameContainer;
