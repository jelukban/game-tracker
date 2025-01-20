import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const addRating = async (ratingInfo) => {
  const { gameId, score } = ratingInfo;
  const user = JSON.parse(secureLocalStorage.getItem("user"));

  const data = await axios.post(
    `/games/${gameId}/rating`,
    { user_id: user.id, score: score },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export default function useMutateAddRating() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ratingInfo) => addRating(ratingInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exploredGames"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
