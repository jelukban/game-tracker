import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const addInterest = async (gameId) => {
  const user = JSON.parse(secureLocalStorage.getItem("user"));

  const data = await axios.post(`/games/${gameId}/interest`, null, {
    headers: {
      User: JSON.stringify({ user_id: user.id }),
      "Content-Type": "application/json",
    },
  });

  return data;
};

export default function useMutateAddInterest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gameId) => addInterest(gameId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exploredGames"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
