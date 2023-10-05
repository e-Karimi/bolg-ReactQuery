/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

const postContext = createContext({
  maxPage: 1,
  currentPage:1,
  setCurrentPage:()=>{}
});

const PostContextProvider = ({ children }) => {
  const [maxPage, setMaxPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: allPosts } = useQuery(["/posts"]);

  useEffect(() => {
    getPostsPagesCount();
  }, [allPosts]);

  const getPostsPagesCount = () => {
    setMaxPage(Math.ceil(allPosts?.length / 9));
  };

  const contextValue = {
    maxPage,
    currentPage,
    setCurrentPage,
  };

  return <postContext.Provider value={contextValue}>{children}</postContext.Provider>;
};

export { postContext, PostContextProvider };
