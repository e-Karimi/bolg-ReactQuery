import useInfinitiImagesQuery from "./../hooks/useInfinitiImagesQuery";
import Loading from "./../components/Loading";
import PicItem from "./../components/PicItem";
import { Link } from "react-router-dom";

export default function Pictures() {
  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfinitiImagesQuery(["pictures"]);

  let content =
    isSuccess &&
    data?.pages.map((page) =>
      page.map((pic) => {
        return <PicItem pic={pic} key={pic.id} />;
      })
    );

  const handleFetchMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div className="relative">
      <h1 className="text-xl pl-4 mb-5">
        Pictures - Infinite Scroll By
        <Link
          to="https://www.npmjs.com/package/react-infinite-scroller"
          className="italic ml-2 text-green-500 underline"
          target="_blank"
        >
          useInfiniteQuery
        </Link>
      </h1>
      <div className="flex gap-3 flex-wrap items-center p-4 ">{content}</div>
      <div className="flex justify-center items-center">
        <button
          type="button"
          onClick={handleFetchMore}
          className={` border bg-cyan-200 px-5 py-2 cursor-pointer rounded-md`}
          disabled={isFetchingNextPage}
        >
          <span className="flex items-center  font-semibold">
            <Loading size="text-xl" />
            <span>{isFetchingNextPage ? "Loading" : "Loade More"}</span>
          </span>
        </button>
      </div>
    </div>
  );
}
