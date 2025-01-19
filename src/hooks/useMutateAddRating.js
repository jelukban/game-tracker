import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const addRating = async (gameId, score) => {
  const user = JSON.parse(secureLocalStorage.getItem("user"));
  console.log(user);
  console.log({ user_id: user.id, score: score });
  //   const data = await axios.post(
  //     `/games/${gameId}/rating`,
  //     { user_id: user.id, score: score },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   return data;
};

export default function useMutateAddRating() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gameId, score) => addRating(gameId, score),
    onSuccess: () => {
      //   queryClient.invalidateQueries({ queryKey: ["exploredGames"] });
      console.log("Rating added");
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
