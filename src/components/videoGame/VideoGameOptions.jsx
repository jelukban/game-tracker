import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function VideoGameOptions() {
  const gameStatus = useSelector((state) => state.gameDetails);
  const [score, setScore] = useState(0);

  const { game_id } = useParams();

  const handleRating = (e) => {
    userGame["score"] = score;

    fetch(`/games/${game_id}/rating`, {
      method: "POST",
      body: JSON.stringify(userGame),
      headers: { "Content-Type": "application/json" },
    });
  };

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
          setGameStatus({
            ...gameStatus,
            playedStatus: false,
          });
        }
      });
  };

  return (
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
      <Form onSubmit={handleRating} className="rating-form">
        <div className="detail-title">Rate this video game:</div>
        <Form.Select
          className="rating-dropdown"
          size="sm"
          onChange={(e) => setScore(e.target.value)}
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
  );
}

export default VideoGameOptions;
