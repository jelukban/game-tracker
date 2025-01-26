import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const fetchUserInfo = (id) => {
  const user = JSON.parse(secureLocalStorage.getItem("user"));

  let queryString = new URLSearchParams({
    id: id,
  }).toString();

  const games = axios.get(`/search/user?${queryString}`, {
    headers: {
      User: JSON.stringify({ id: user.id }),
      "Content-Type": "application/json",
    },
  });

  return games;
};

export default function useQueryUserInfo(id) {
  return useQuery({
    queryKey: ["followUser", id],
    queryFn: () => fetchUserInfo(id),
  });
}
