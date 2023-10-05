import InfiniteScroll from "react-infinite-scroller";
import useInfinitiImagesQuery from './../hooks/useInfinitiImagesQuery'
import Loading from "./../components/Loading";
import PicItem from "./../components/PicItem";
import { Link } from "react-router-dom";


export default function Gallary() {
  const { data, isSuccess, hasNextPage, fetchNextPage } =useInfinitiImagesQuery(['Gallay'])

  let content = !isSuccess
    ? ""
    : data.pages.map((page) => page.map((pic) => <PicItem pic={pic} key={pic.id} />));

  return (
    <div>
      <h1 className="text-xl pl-4 mb-5">
        Gallary - Infinite Scroll By
        <Link
          to="https://www.npmjs.com/package/react-infinite-scroller"
          className="italic ml-2 text-green-500 underline"
          target="_blank"
        >
          react-infinite-scroller Pakage
        </Link>
      </h1>
      <InfiniteScroll
        hasMore={hasNextPage}
        loadMore={fetchNextPage}
        loader={
          <div key={0}>
            <Loading size="text-3xl" position="fixed bottom-2 right-[50%]" />
          </div>
        }
      >
        <div className="flex gap-3 flex-wrap items-center p-4 ">{content}</div>
      </InfiniteScroll>
    </div>
  );
}
