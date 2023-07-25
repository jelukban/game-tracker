import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import VideoGameContainer from "../videoGame/VideoGameContainer.js";

function UserInterests(props) {
  const [interestingGames, setInterestingGames] = useState([]);

  let { user } = props;

  if (!user) {
    user = JSON.parse(secureLocalStorage.getItem("user"))
      ? JSON.parse(secureLocalStorage.getItem("user"))
      : undefined;
  }

  useEffect(() => {
    fetch("/user/interests", {
      headers: {
        User: JSON.stringify(user),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setInterestingGames(result.data);
      });
  }, []);

  return (
    <div>
      <h1>Interests</h1>
      <VideoGameContainer games={interestingGames} />
    </div>
  );
}

export default UserInterests;
