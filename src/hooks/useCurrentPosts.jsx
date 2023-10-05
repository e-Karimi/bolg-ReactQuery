import axios from "axios";
import { useQuery } from "react-query";

const fetcher = async (currentPage) =>
  await axios
    .get(`http://localhost:3000/posts/?_limit=9&_page=${currentPage}`)
    .then((res) => res.data);

export default function useCurrentPosts(currentPage) {
  return useQuery(["posts", currentPage], () => fetcher(currentPage), {
    keepPreviousData: true,
  });
}
