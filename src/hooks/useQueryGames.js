import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const fetchGames = (gameId = "") => {
  const user = JSON.parse(secureLocalStorage.getItem("user"));

  const header = gameId
    ? {
        headers: {
          User: JSON.stringify({ user_id: user.id }),
          "Content-Type": "application/json",
        },
      }
    : null;

  const data = axios.get(`/games${gameId}`, header);

  return data;
};

export default function useQueryGames(gameId) {
  return useQuery({
    queryKey: ["exploredGames", gameId],
    queryFn: () => fetchGames(gameId),
  });
}
