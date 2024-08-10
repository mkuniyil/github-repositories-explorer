import { useQuery } from "@tanstack/react-query";
import { fetchAndParse } from "../../utils/fetchAndParse";
import { QUERY_KEYS } from "../constants";
import { mapUsersData } from "../mappers/mapUserData";

export const useGetUsers = (searchStr: string) => {
  const url = `https://api.github.com/search/users?q=${searchStr}`;

  const { isLoading, data, error } = useQuery({
    queryKey: [QUERY_KEYS.GET_USERS, searchStr],
    queryFn: () => fetchAndParse(url),
    enabled: searchStr.length > 0,
  });

  return {
    isLoading,
    data: {
      items: data?.data?.items?.map(mapUsersData) ?? [],
      totalCount: data?.data?.total_count,
    },
    error,
  };
};
