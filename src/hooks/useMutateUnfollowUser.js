import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const unfollowUser = async (id) => {
  const followerUserInfo = JSON.parse(secureLocalStorage.getItem("user"))
    ? JSON.parse(secureLocalStorage.getItem("user"))
    : undefined;

  const data = await axios.put(
    "/unfollow",
    JSON.stringify({
      followUserId: followerUserInfo.id,
      followingUserId: id,
    }),
    { headers: { "Content-Type": "application/json" } }
  );

  return data;
};

export default function useMutateUnfollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => unfollowUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followUser"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
