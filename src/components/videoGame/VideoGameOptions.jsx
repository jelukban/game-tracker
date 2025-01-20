import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import secureLocalStorage from "react-secure-storage";
import useQueryGames from "../../hooks/useQueryGames";
import useMutateAddInterest from "../../hooks/useMutateAddInterest";
import useMutateDeleteInterest from "../../hooks/useMutateDeleteInterest";
import useMutateAddPlayed from "../../hooks/useMutateAddPlayed";
import useMutateDeletePlayed from "../../hooks/useMutateDeletePlayed";
import useMutateAddRating from "../../hooks/useMutateAddRating";

function VideoGameOptions() {
  const addInterest = useMutateAddInterest();
  const deleteInterest = useMutateDeleteInterest();
  const addPlayed = useMutateAddPlayed();
  const deletePlayed = useMutateDeletePlayed();
  const addRating = useMutateAddRating();

  const [score, setScore] = useState(0);

  const { game_id } = useParams();

  const user = JSON.parse(secureLocalStorage.getItem("user"))
    ? JSON.parse(secureLocalStorage.getItem("user"))
    : undefined;

  const userGame = { game_id: game_id };

  userGame.user_id = user?.id;

  const gameQuery = useQueryGames(`${game_id}`);
  const game = gameQuery.isSuccess ? gameQuery?.data?.data?.data : {};

  const gameStatus = {
    interestStatus: game?.interest_status,
    playedStatus: game?.game_played_status,
  };

  const handleRating = (e) => {
    e.preventDefault();
    addRating.mutate({ gameId: game_id, score });
  };

  const handleInterests = () => {
    addInterest.mutate(game_id);
  };

  const deleteInterests = () => {
    deleteInterest.mutate(game_id);
  };

  const handlePlayed = () => {
    addPlayed.mutate(game_id);
  };

  const deletePlayedGame = () => {
    deletePlayed.mutate(game_id);
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
            onClick={deletePlayedGame}
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
