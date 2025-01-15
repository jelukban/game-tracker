import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import secureLocalStorage from "react-secure-storage";
import Details from "./Details";
import VideoGameOptions from "./VideoGameOptions";
import {
  setInterestStatus,
  setPlayedStatus,
} from "../../redux/slices/gameDetailsSlice";
import useQueryGames from "../../hooks/useQueryGames";

function VideoGameDetails() {
  const dispatch = useDispatch();

  const user = JSON.parse(secureLocalStorage.getItem("user"))
    ? JSON.parse(secureLocalStorage.getItem("user"))
    : undefined;

  const { game_id } = useParams();
  const userGame = { game_id: game_id };

  if (user) {
    userGame["user_id"] = user.id;
  }

  const isLoggedIn = secureLocalStorage.getItem("authorized");

  const gameQuery = useQueryGames(`/${game_id}`);
  const game = gameQuery.isSuccess ? gameQuery?.data?.data?.data : {};

  if (game?.release_date) {
    game.release_date = game.release_date.slice(0, -9);
  }

  useEffect(() => {
    if (gameQuery?.isSuccess) {
      dispatch(setInterestStatus(game.interest_status));
      dispatch(setPlayedStatus(game.game_played_status));
    }
  }, [gameQuery]);

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
