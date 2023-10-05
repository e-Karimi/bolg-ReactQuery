import { QueryClient } from "react-query";
import axios from "axios";
import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(`http://localhost:3000${queryKey}`);
  return data;
};

const queryErrorHandler = (error) => {
  const textError = error instanceof Error ? error.message : "Error Connecting To Server";

  return toast({
    title: "Error Message :",
    description: textError,
    status: "error",
    duration: 9000,
    isClosable: true,
  });
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      onError: queryErrorHandler,
    },
    mutations: {
      onError: queryErrorHandler,
    },
  },
});
