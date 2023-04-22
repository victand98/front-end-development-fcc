import axios, { AxiosError, AxiosInstance } from "axios";
import { API_KEY, API_URL } from "../constants";
import { ApiError } from "./utils";

const request: AxiosInstance = axios.create({
  baseURL: API_URL || "/",
  headers: { "X-Api-Key": API_KEY },
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { response } = error;

    if (response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new ApiError(
        response.status,
        (response.data as any).message || response.statusText
      );
    } else if (error.request) {
      // The request was made but no response was received
      throw new ApiError(
        500,
        "Network error occurred. Please try again later."
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new ApiError(500, error.message);
    }
  }
);

export { request };
