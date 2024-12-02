import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchGames = (url) => {
  const data = axios.get(url);

  return data;
};

export default function useQueryGames(url) {
  return useQuery({
    queryKey: ["exploredGames"],
    queryFn: () => fetchGames(url),
  });
}
