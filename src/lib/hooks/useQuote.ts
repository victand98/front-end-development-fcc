import { Quote } from "@/@types";
import useSWR from "swr";
import { fetcher } from "../helpers";

export const useQuote = () => {
  const { data, error } = useSWR<Quote[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/quotes`,
    fetcher
  );

  return {
    quote: data ? data[0] : null,
    isLoading: !error && !data,
    isError: error,
  };
};
