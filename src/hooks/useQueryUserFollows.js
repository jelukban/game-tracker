import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getUserFollows = async () => {
  const user = JSON.parse(secureLocalStorage.getItem("user"))
    ? JSON.parse(secureLocalStorage.getItem("user"))
    : undefined;

  const data = await axios.get(`/user/followings`, null, {
    headers: {
      User: JSON.stringify(user),
      "Content-Type": "application/json",
    },
  });

  return data;
};

export default function useQueryUserFollows() {
  return useQuery({
    queryKey: ["userFollows"],
    queryFn: getUserFollows,
  });
}
