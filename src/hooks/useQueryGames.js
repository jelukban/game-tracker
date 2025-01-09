import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchGames = () => {
  const data = axios.get("/games");

  return data;
};

export default function useQueryGames(url) {
  return useQuery({
    queryKey: ["exploredGames"],
    queryFn: () => fetchGames(url),
  });
}
