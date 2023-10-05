/* eslint-disable no-unused-vars */
import useInfinitiImagesQuery from './../hooks/useInfinitiImagesQuery'
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import PicItem from "./../components/PicItem";
import Loading from "./../components/Loading";
import { Link } from "react-router-dom";

export default function Photos() {
  const { inView, ref } = useInView();
  const { data, isSuccess, hasNextPage, fetchNextPage } = useInfinitiImagesQuery(["Photos"])


  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  let content =
    isSuccess &&
    data.pages.map((page) =>
      page.map((pic, index) => {
        if (page.length > 3 && page.length - 3 === index) {
          return <PicItem ref={ref} pic={pic} key={pic.id} />;
        } else {
          return <PicItem pic={pic} key={pic.id} />;
        }
      })
    );

  return (
    <div>
      <h1 className="text-xl pl-4 mb-5">
        Photos - Infinite Scroll By
        <Link
          to="https://www.npmjs.com/package/react-intersection-observer"
          className="italic ml-2 text-green-500 underline"
          target="_blank"
        >
          react-intersection-observer Pakage
        </Link>
      </h1>
      <div className="flex gap-3 flex-wrap items-center p-4 ">{content}</div>
      <Loading size="text-3xl" position="fixed bottom-2 right-[50%]" />
    </div>
  );
}
