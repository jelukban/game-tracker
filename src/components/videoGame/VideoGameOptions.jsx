import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function VideoGameOptions() {
  const handleRating = (e) => {
    userGame["score"] = score;

    fetch(`/games/${game_id}/rating`, {
      method: "POST",
      body: JSON.stringify(userGame),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
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
  );
}

export default VideoGameOptions;
