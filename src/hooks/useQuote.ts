import { Quote } from "@/lib";
import useRequest from "./useRequest";

export const useQuote = () => {
  const quote = useRequest<Quote[]>({ url: `/v1/quotes` });
  return quote;
};
