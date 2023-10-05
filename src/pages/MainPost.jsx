/* eslint-disable no-unused-vars */
import { useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useForm } from "react-hook-form";
import Loading from "../components/Loading";
import axios from "axios";
import postImage from "./../assets/post.svg";
import postImage2 from "./../assets/post2.svg";

export default function MainPost() {
  const { id: postId, page } = useParams();
  const queryClient = useQueryClient();

  const currentPage = Number(page.slice(5));

  const { data: post } = useQuery([`/posts/${postId}`], {
    enabled: !!postId,
    initialData: () => {
      const posts = queryClient.getQueryData(["posts", currentPage]);
      const mainPost = posts?.find((post) => post.id === +postId);
      return mainPost;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: async () => {
      const posts = queryClient.getQueryData(["posts", currentPage]);
      const mainPost = posts?.find((post) => post.id === +postId);
      return {
        title: mainPost.title,
        desc: mainPost.body,
      };
    },
  });

  const { mutate: editMutate } = useMutation(
    async (updatedPost) =>
      axios.put(
        `http://localhost:3000/posts/${postId}`,
        { ...updatedPost },
        { headers: { "Content-Type": "application/json" } }
      ),
    {
      onSuccess: (response, id) => {
        queryClient.invalidateQueries([`/posts/${postId}`]);
      },
    }
  );

  const handleEditPost = ({ title, desc }) => {
    let updatedPost = {
      title,
      body: desc,
    };
    editMutate(updatedPost);

    return new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
  };

  return (
    <div className="flex gap-x-12  ">
      {/* Post */}
      <div className="w-1/2 p-3">
        <h1 className="text-2xl mb-3 ">{post?.title}</h1>
        <div
          style={
            post?.cover ? { backgroundColor: `${post.cover}` } : { backgroundColor: `#d3c4d6` }
          }
          className="w-full h-44 rounded p-1 flex gap-x-10"
        >
          <img src={postImage} alt="post Image" className="w-44 h-44" />
          <img src={postImage2} alt="second post Image" className="w-44 h-44" />
        </div>
        <p className="text-base my-3 text-justify">{post?.body}</p>
        <Link
          to={`/posts/page-${currentPage}`}
          className="inline-block border px-4 py-1 mt-5 bg-sky-200 rounded font-semibold"
        >
          Back
        </Link>
      </div>
      {/*Post Edit Form */}
      <div className="w-1/2 p-3 pt-5">
        <form onSubmit={handleSubmit(handleEditPost)} name="edit-form">
          <div className="mb-2">
            <label htmlFor="title" className="block mb-2 text-lg font-medium text-gray-900">
              Title
            </label>
            <input
              {...register("title", {
                required: "Title is required",
                minLength: { value: 5, message: "Title should have at least 5 characters" },
              })}
              type="text"
              id="title"
              placeholder="title..."
              className="bg-white border border-gray-300 text-gray-900 text-base rounded-md  focus:border-gray-400 block  p-2.5 outline-none w-full"
            />
            {errors.title && (
              <small className="text-sm text-cyan-500 ml-2">{errors.title.message}</small>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="block mb-2 text-lg font-medium text-gray-900">
              Description
            </label>
            <textarea
              {...register("desc", { required: "Description is required" })}
              id="desc"
              placeholder="write something..."
              className="bg-white border border-gray-300 text-gray-900 text-base rounded-md  focus:border-gray-400 block  p-2.5 outline-none w-full h-52"
            />
            {errors.desc && (
              <small className="text-sm text-cyan-600 ml-2">{errors.desc.message}</small>
            )}
          </div>

          <button
            type="submit"
            className={`border bg-cyan-200 px-4 py-1.5 mt-4 cursor-pointer rounded-md 
            ${isSubmitting && "cursor-wait"} `}
            disabled={isSubmitting}
          >
            <span className="flex items-center  font-semibold">
              {isSubmitting && <Loading size="text-xl" isSubmitting />} Save Edit
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
