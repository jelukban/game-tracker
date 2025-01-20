import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getSearchResults = async (gameName) => {
  const data = await axios.get(`/search/games?gameName=${gameName}`);

  return data;
};

export default function useQuerySearchGames(gameName) {
  return useQuery({
    queryKey: ["search"],
    queryFn: () => getSearchResults(gameName),
  });
}
