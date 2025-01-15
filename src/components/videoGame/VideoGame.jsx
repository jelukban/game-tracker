import { React, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import secureLocalStorage from "react-secure-storage";
import Details from "./Details";
import VideoGameOptions from "./VideoGameOptions";
import useQueryGames from "../../hooks/useQueryGames";

function VideoGameDetails() {
  const user = JSON.parse(secureLocalStorage.getItem("user"))
    ? JSON.parse(secureLocalStorage.getItem("user"))
    : undefined;

  const { game_id } = useParams();
  const userGame = { game_id: game_id };

  if (user) {
    userGame["user_id"] = user.id;
  }

  const [score, setScore] = useState(0);

  const isLoggedIn = secureLocalStorage.getItem("authorized");

  const gameQuery = useQueryGames(`/${game_id}`);
  const game = gameQuery.isSuccess ? gameQuery?.data?.data?.data : {};

  if (game?.release_date) {
    game.release_date = game.release_date.slice(0, -9);
  }

  const initialGameStatus = {
    interestStatus: game.interest_status,
    playedStatus: game.game_played_status,
  };

  const [gameStatus, setGameStatus] = useState(initialGameStatus);

  console.log({ game });
  const handleInterests = () => {
    fetch(`/games/${game_id}/interest`, {
      method: "POST",
      headers: {
        User: JSON.stringify(userGame),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "Interest made") {
          setGameStatus({
            ...gameStatus,
            interestStatus: true,
          });
        }
      });
  };

  const deleteInterests = () => {
    fetch(`/games/${game_id}/interest`, {
      method: "DELETE",
      body: JSON.stringify(userGame),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "Interest deleted") {
          setGameStatus({
            ...gameStatus,
            interestStatus: false,
          });
        }
      });
  };

  const handlePlayed = () => {
    fetch(`/games/${game_id}/played`, {
      method: "POST",
      headers: {
        User: JSON.stringify(userGame),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "GamePlayed was made") {
          setGameStatus({
            ...gameStatus,
            playedStatus: true,
          });
        }
      });
  };

  const deletePlayed = () => {
    fetch(`/games/${game_id}/played`, {
      method: "DELETE",
      body: JSON.stringify(userGame),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "Game played deleted") {
          // setState({
          //   ...state,
          //   gameStatus: { ...gameStatus, playedStatus: false },
          // });
          setGameStatus({
            ...gameStatus,
            playedStatus: false,
          });
        }
      });
  };

  const handleRating = (e) => {
    userGame["score"] = score;

    fetch(`/games/${game_id}/rating`, {
      method: "POST",
      body: JSON.stringify(userGame),
      headers: { "Content-Type": "application/json" },
    });
  };

  if (isLoggedIn) {
    return (
      <Container className="game-detail">
        <Row>
          <Details game={game} />
          <Col className="align-self-start">
            <div className="game-selection">
              <div className="detail-title">Track this game!</div>
              <div className="interest-played-button">
                {gameStatus.interestStatus ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={deleteInterests}
                    className="form-button game-status"
                  >
                    Uninterest
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleInterests}
                    className="form-button game-status"
                  >
                    Interest
                  </Button>
                )}
                {gameStatus.playedStatus ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={deletePlayed}
                    className="form-button game-status"
                  >
                    Unplayed
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handlePlayed}
                    className="form-button game-status"
                  >
                    Played
                  </Button>
                )}
              </div>
              <VideoGameOptions />
            </div>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container className="game-detail ">
        <Row>
          <Details game={game} />
        </Row>
      </Container>
    );
  }
}

export default VideoGameDetails;
