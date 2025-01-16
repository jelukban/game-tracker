import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const deleteInterest = async (gameId) => {
  const user = JSON.parse(secureLocalStorage.getItem("user"));

  const data = await axios.delete(`/games/${gameId}/interest`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: { user_id: user.id },
  });

  return data;
};

export default function useMutateDeleteInterest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gameId) => deleteInterest(gameId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exploredGames"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
