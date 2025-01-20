import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const getSearchResults = async (queryString) => {
  const followerUserInfo = JSON.parse(secureLocalStorage.getItem("user"))
    ? JSON.parse(secureLocalStorage.getItem("user"))
    : undefined;

  const data = await axios.get(`/search/user?${queryString}`, {
    headers: {
      User: followerUserInfo.id,
      "Content-Type": "application/json",
    },
  });

  return data;
};

export default function useQuerySearchUsers(queryString) {
  return useQuery({
    queryKey: ["search"],
    queryFn: () => getSearchResults(queryString),
    enabled: queryString !== "",
  });
}
