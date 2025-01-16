import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const addPlayed = async (gameId) => {
  const user = JSON.parse(secureLocalStorage.getItem("user"));

  const data = await axios.post(`/games/${gameId}/played`, null, {
    headers: {
      User: JSON.stringify({ user_id: user.id }),
      "Content-Type": "application/json",
    },
  });

  return data;
};

export default function useMutateAddPlayed() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gameId) => addPlayed(gameId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exploredGames"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
