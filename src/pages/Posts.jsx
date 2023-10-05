/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useQueryClient } from "react-query";
import { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { postContext } from "./../context/postsContext";
import axios from "axios";
import Post from "./../components/Post";
import useCurrentPosts from "../hooks/useCurrentPosts";

export default function Posts() {
  const { page } = useParams();
  const queryClient = useQueryClient();
  const { maxPage, setCurrentPage } = useContext(postContext);
  const currentPage = Number(page.slice(5));

  const { data: currentPosts } = useCurrentPosts(currentPage);

  const prefetchNextPost = () => {
    const nextPage = currentPage + 1;

    queryClient.prefetchQuery(
      ["posts", nextPage],
      async (nextPage) =>
        await axios
          .get(`http://localhost:3000/posts/?_limit=9&_page=${nextPage}`)
          .then((res) => res.data)
    );
  };

  useEffect(() => {
    //*prefetch next page
    prefetchNextPost();

    //* save the currentPage in context
    setCurrentPage(Number(page.slice(5)));
    
  }, [currentPage, queryClient]);

  return (
    <div className="px-3">
      <h1 className="text-2xl mb-3 ">Posts</h1>
      <div className="w-[55%] relative ">
        {currentPosts?.map((post) => (
          <Post
            key={post.id}
            post={post}
            currentPage={currentPage}
          />
        ))}

        <div className="fixed bottom-4 left-[5%] ">
          <div className=" flex items-center justify-center gap-x-5 mt-1">
            <button
              className="border  bg-cyan-300 text-slate-800 rounded  font-semibold disabled:opacity-75 disabled:font-normal disabled:cursor-not-allowed"
              disabled={currentPage <= 1}
            >
              <Link
                to={`/posts/page-${currentPage > 1 ? currentPage - 1 : currentPage}`}
                className=" px-4 py-1 block"
              >
                prev
              </Link>
            </button>
            <span className="w-10 h-10 rounded-full bg-gray-200 text-slate-800  border flex justify-center items-center">
              {currentPage}
            </span>
            <button
              className="border bg-cyan-300 tetx-slate-800  rounded  font-semibold disabled:font-normal disabled:opacity-75"
              disabled={currentPage >= maxPage}
            >
              <Link
                to={`/posts/page-${currentPage < maxPage ? currentPage + 1 : currentPage}`}
                className=" px-4 py-1 block"
              >
                next
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
