import { useInfiniteQuery } from "react-query";
import axios from "axios";

const fetcher = (pageParam) =>
  axios.get(`http://localhost:3000/photos/?_limit=24&_page=${pageParam}`).then((res) => res.data);

export default function useInfinitiImagesQuery(queryKey) {
  return useInfiniteQuery(queryKey, ({ pageParam = 1 }) => fetcher(pageParam), {
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length < 250) {
        return allPages.length + 1;
      } else {
        return undefined;
      }
    },
  });
}
