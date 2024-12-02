import { React, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Details from "./Details";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import secureLocalStorage from "react-secure-storage";

function VideoGameDetails() {
  const user = JSON.parse(secureLocalStorage.getItem("user"))
    ? JSON.parse(secureLocalStorage.getItem("user"))
    : undefined;

  const { game_id } = useParams();
  const userGame = { game_id: game_id };

  if (user) {
    userGame["user_id"] = user.id;
  }

  const [state, setState] = useState({
    game: {},
    score: 0,
    gameStatus: {},
  });

  const { game, score, gameStatus } = state;

  const isLoggedIn = secureLocalStorage.getItem("authorized");

  useEffect(() => {
    fetch(`/games/${game_id}`, {
      headers: {
        User: JSON.stringify(userGame),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        result = result.data;
        result.release_date = result.release_date.slice(0, -9);
        if (result.description === "None") {
          result.description = "";
        }
        setState({
          ...state,
          game: result,
          gameStatus: {
            interestStatus: result.interest_status,
            playedStatus: result.game_played_status,
          },
        });
      });
  }, []);

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
          setState({
            ...state,
            gameStatus: { ...gameStatus, interestStatus: true },
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
          setState({
            ...state,
            gameStatus: { ...gameStatus, interestStatus: false },
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
          setState({
            ...state,
            gameStatus: { ...gameStatus, playedStatus: true },
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
          setState({
            ...state,
            gameStatus: { ...gameStatus, playedStatus: false },
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
                )}{" "}
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
              <Form onSubmit={handleRating} className="rating-form">
                <div className="detail-title">Rate this video game:</div>
                <Form.Select
                  className="rating-dropdown"
                  size="sm"
                  onChange={(e) =>
                    setState({ ...state, score: e.target.value })
                  }
                  autosize="false"
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Select>
                <Button
                  variant="secondary"
                  size="sm"
                  type="submit"
                  className="rating-button"
                >
                  Submit
                </Button>
              </Form>
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
