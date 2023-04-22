import "@/styles/globals.css";
import { AppPropsWithLayout } from "next";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SWRConfig
      value={{
        fallback: pageProps.fallback,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnMount: false,
      }}
    >
      {getLayout(<Component {...pageProps} />)}
    </SWRConfig>
  );
}
