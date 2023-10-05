import Navbar from "./components/Navbar";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./React-Query/queryClient";
import { ReactQueryDevtools } from "react-query/devtools";
import {PostContextProvider} from "./context/postsContext";

export default function App() {
  const routing = useRoutes(routes);
  return (
    <QueryClientProvider client={queryClient}>
      <PostContextProvider>
        <div className="select-none">
          <Navbar />
          <div className="p-4">{routing}</div>
        </div>
      </PostContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
