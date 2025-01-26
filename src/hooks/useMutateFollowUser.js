import { useMutation } from "@tanstack/react-query";
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
  return useMutation({
    mutationFn: (id) => followUser(id),
    onSuccess: () => {
      toast.success("User followed");
    },
    onError: () => {
      toast.error("Error when trying to follow user");
    },
  });
}
