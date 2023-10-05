import Home from "./pages/Home";
import Posts from "./pages/Posts";
import MainPost from "./pages/MainPost";
import Gallary from "./pages/Gallary";
import Photos from "./pages/Photos";
import Pictures from "./pages/Pictures";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/posts/:page", element: <Posts /> },
  { path: "/posts/:page/:id", element: <MainPost /> },
  { path: "/gallary", element: <Gallary /> },
  { path: "/photos", element: <Photos /> },
  { path: "/pictures", element: <Pictures /> },
];
export default routes;
