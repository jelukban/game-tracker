import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUserGames = (type, userId) => {
  const games = axios.get(`/user/${type}`, {
    headers: {
      User: JSON.stringify({ id: userId }),
      "Content-Type": "application/json",
    },
  });

  return games;
};

export default function useQueryUserGames(type, userId) {
  return useQuery({
    queryKey: ["userGames", type, userId],
    queryFn: () => fetchUserGames(type, userId),
    enabled: userId !== "",
  });
}
