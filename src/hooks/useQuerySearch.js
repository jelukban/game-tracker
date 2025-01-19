import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const search = async () => {
  const searchParams = useSearchParams();
  //   const data = await axios.get();
  console.log(searchParams);
};

export default function useMutateSearch() {
  return useQuery({ queryKey: ["search"], queryFn: search });
}
