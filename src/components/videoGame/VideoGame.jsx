import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import secureLocalStorage from "react-secure-storage";
import Details from "./Details";
import VideoGameOptions from "./VideoGameOptions";
import useQueryGames from "../../hooks/useQueryGames";

function VideoGameDetails() {
  const { game_id } = useParams();
  const isLoggedIn = secureLocalStorage.getItem("authorized");

  const gameQuery = useQueryGames(`${game_id}`);
  const game = gameQuery.isSuccess ? gameQuery?.data?.data?.data : {};

  if (game?.release_date) {
    game.release_date = game.release_date.slice(0, -9);
  }

  return (
    <Container className="game-detail">
      <Row>
        <Details game={game} />
        <Col className="align-self-start">
          {isLoggedIn && <VideoGameOptions />}
        </Col>
      </Row>
    </Container>
  );
}

export default VideoGameDetails;
