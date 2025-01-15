import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchGames = (gameId = "") => {
  const header = gameId
    ? {
        headers: {
          User: JSON.stringify({ gameId }),
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
