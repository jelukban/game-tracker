import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";

const followUser = async (id) => {
  const followerUserInfo = JSON.parse(secureLocalStorage.getItem("user"))
    ? JSON.parse(secureLocalStorage.getItem("user"))
    : undefined;

  const data = await axios.put(
    "/follow",
    JSON.stringify({
      followUserId: followerUserInfo.id,
      followingUserId: id,
    }),
    { headers: { "Content-Type": "application/json" } }
  );

  return data;
};

export default function useMutateFollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => followUser(id),
    onSuccess: (data, variables, context) => {
      toast.success("User followed");
      queryClient.invalidateQueries({ queryKey: ["followUser", variables] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
