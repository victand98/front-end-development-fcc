import { Quote } from "../models";
import { request } from "../request";

export class QuoteService {
  static getQuote = async () => request.request<Quote[]>({ url: "/v1/quotes" });
}
