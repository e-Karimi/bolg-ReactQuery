/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import HomeIcon from "./../assets/home.svg";
import Loading from "../components/Loading";
import { TypeAnimation } from "react-type-animation";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { postContext } from "./../context/postsContext";

const addPost = async (newPost) => {
  if (newPost) {
    await axios
      .post(
        `http://localhost:3000/posts`,
        { ...newPost },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => res.data);
  }
};

export default function Home() {
  const { maxPage } = useContext(postContext);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      desc: "",
      cover: "#d3c4d6",
    },
  });

  const { mutate: handleAddPost } = useMutation((newPost) => addPost(newPost), {
    onSuccess: () => {
      queryClient.invalidateQueries(["/posts"]);
    },
  });

  const { data: lastPosts } = useQuery(["/posts"], {
    select: (data) => {
      return data
        .slice()
        .reverse()
        .filter((post, index) => index < 9);
    },
  });

  const submitForm = (data) => {
    const newPost = {
      userId: 11,
      title: data.title,
      body: data.desc,
      cover: data.cover,
    };
    handleAddPost(newPost);

    return new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
  };

  return (
    <div className="px-4 ">
      <div className="flex justify-between gap-x-10 ">
        <div className="w-[400px] px-12 py-4 bg-slate-50 rounded-2xl border">
          <h1 className="font-bold text-2xl text-cyan-500 mb-4">Add Post</h1>
          {/* Form */}
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="mb-2">
              <label htmlFor="title" className="block mb-2 text-md font-medium text-gray-900">
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
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md  focus:border-gray-400 block  p-2.5 outline-none w-full"
              />
              {errors.title && (
                <small className="text-sm text-cyan-500 ml-2">{errors.title.message}</small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="desc" className="block mb-2 text-md font-medium text-gray-900">
                Description
              </label>
              <textarea
                {...register("desc", { required: "Description is required" })}
                id="desc"
                placeholder="write somrthing..."
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md  focus:border-gray-400 block  p-2.5 outline-none w-full h-36"
              />
              {errors.desc && (
                <small className="text-sm text-cyan-600 ml-2">{errors.desc.message}</small>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="cover" className="block mb-2 text-md font-medium text-gray-900">
                Select a Cover
              </label>
              <input
                type="color"
                {...register("cover")}
                defaultValue="#d3c4d6"
                name="cover"
                id="cover"
              />
            </div>
            <button
              type="submit"
              className={`border bg-cyan-200 px-5 py-2 cursor-pointer rounded-md
              ${isSubmitting && "cursor-wait"} `}
              disabled={isSubmitting}
            >
              <span className="flex items-center font-semibold">
                {isSubmitting && <Loading size="text-xl" isSubmitting />} Submit
              </span>
            </button>
          </form>
        </div>
        {/* Last Posts */}
        <div className="flex-[35%] flex flex-col justify-start py-4 px-5  border rounded-xl overflow-hidden">
          <h1 className="text-2xl mb-4">Last Posts</h1>
          {lastPosts?.map((post) => (
            <div key={post.id} className="mb-3 flex relative">
              <div className="bg-blue-500 w-2 h-2 absolute top-[13px] left-0 rounded-sm"></div>
              <Link
                to={`/posts/page-${maxPage}`}
                className=" line-clamp-2 p-1 ml-3 text-md hover:underline hover:underline-offset-4 hover:decoration-blue-500"
              >
                {post.title}
              </Link>
            </div>
          ))}
        </div>
        {/* Picture */}
        <div className="flex-[35%] flex flex-col justify-start items-center py-8 bg-blue-50 rounded-2xl overflow-hidden">
          <div className="text-xl font-semibold text-purple-800 px-7 mb-10  ">
            <TypeAnimation
              style={{ whiteSpace: "pre-line", height: "120px", display: "block",textAlign:'center' }}
              sequence={[
                `React Query\nPowerful asynchronous state.\nManagement for TS/JS, React,\nSolid, Vue and Svelte.`,
                1000,
              ]}
              repeat={Infinity}
              speed={{type: 'keyStrokeDelayInMs', value: 200}}
            />
          </div>
          <img src={HomeIcon} alt="home picture" className="w-[45%]" />
        </div>
      </div>
    </div>
  );
}
