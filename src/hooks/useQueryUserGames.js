import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const fetchUserGames = (type) => {
  const user = JSON.parse(secureLocalStorage.getItem("user"));

  const games = axios.get(`/user/${type}`, {
    headers: {
      User: JSON.stringify(user),
      "Content-Type": "application/json",
    },
  });

  return games;
};

export default function useQueryUserGames(type) {
  return useQuery({
    queryKey: ["userGames", type],
    queryFn: () => fetchUserGames(type),
  });
}
