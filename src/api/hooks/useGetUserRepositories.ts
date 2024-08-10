import { useQuery } from "@tanstack/react-query";
import { fetchAndParse } from "../../utils/fetchAndParse";
import { QUERY_KEYS } from "../constants";
import { mapRepositoryData } from "../mappers/mapRespositoryData";

export const useGetUserRepositories = (url: string) => {
  const { isLoading, data, error } = useQuery({
    queryKey: [QUERY_KEYS.GET_USER_REPOSITORIES, url],
    queryFn: () => fetchAndParse(url),
  });

  return {
    isLoading,
    data: data?.data?.map(mapRepositoryData) ?? [],
    error,
  };
};
