import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const deletePlayed = async (gameId) => {
  const user = JSON.parse(secureLocalStorage.getItem("user"));

  const data = await axios.delete(`/games/${gameId}/played`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: { user_id: user.id },
  });

  return data;
};

export default function useMutateDeletePlayed() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gameId) => deletePlayed(gameId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exploredGames"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
