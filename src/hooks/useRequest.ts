import { getSWRKey, request as httpRequest } from "@/lib";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import useSWR, { SWRConfiguration, SWRResponse } from "swr";

export type GetRequest = AxiosRequestConfig | null;

interface Return<Data, Error>
  extends Pick<
    SWRResponse<AxiosResponse<Data>, AxiosError<Error>>,
    "isValidating" | "error" | "mutate"
  > {
  data: Data | undefined;
  response: AxiosResponse<Data> | undefined;
  loading: boolean;
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<
    SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>,
    "fallbackData"
  > {
  fallbackData?: Data;
}

export default function useRequest<Data = unknown, Error = unknown>(
  request: GetRequest,
  config: Config<Data, Error> = {}
): Return<Data, Error> {
  const { fallbackData, ...swrConfig } = config;

  const {
    data: response,
    error,
    isValidating,
    mutate,
  } = useSWR<AxiosResponse<Data>, AxiosError<Error>>(
    getSWRKey(request!),
    () => httpRequest.request<Data>(request!),
    {
      ...swrConfig,
      fallbackData:
        fallbackData &&
        ({
          status: 200,
          statusText: "InitialData",
          config: request!,
          headers: {},
          data: fallbackData,
        } as AxiosResponse<Data>),
    }
  );

  return {
    data: response && response.data,
    response,
    loading: !error && !response,
    error,
    isValidating,
    mutate,
  };
}
