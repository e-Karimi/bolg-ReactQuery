/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useQueryClient, useMutation } from "react-query";
import axios from "axios";
import swal from "sweetalert";

export default function Post({ post, currentPage }) {
  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation(
    async (postId) => axios.delete(`http://localhost:3000/posts/${postId}`).then((res) => res.data),
    {
      onSuccess: (response, postId) => {
        queryClient.invalidateQueries(["posts", currentPage]);
        queryClient.invalidateQueries(["/posts"]);
      },
    }
  );

  const handleDeletePost = (postId) => {
    swal({
      title: `Do you want to delete this post?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((value) => {
      if (value) {
        deleteMutate(postId);
        swal({ title: " the post was deleted", icon: "success" });
      }
    });
  };

  const isSeen = (post) => queryClient.getQueryData([`/posts/${post.id}`]);

  return (
    <>
      <div className="mb-3 flex items-center relative">
        <div className="w-full">
          <div className="bg-blue-500 w-2 h-2 absolute top-[13px] left-0 rounded-sm"></div>
          <Link
            to={`/posts/page-${currentPage}/${post.id}`}
            className={`line-clamp-1 p-1 ml-3 text-md hover:underline hover:underline-offset-4 hover:decoration-blue-500
              ${isSeen(post) ? "font-semibold text-purple-700" : ""} `}
          >
            {post.title}
          </Link>
        </div>
        <div className="ml-8">
          <button
            onClick={() => handleDeletePost(post.id)}
            className=" hover:ring-2 hover:ring-offset-2   ring-sky-400  px-2.5 py-2 bg-slate-200 hover:bg-blue-200 text-gray-800 rounded-md font-normal text-lg "
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      </div>
    </>
  );
}
