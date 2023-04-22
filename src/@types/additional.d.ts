import { NextPage } from "next";
import { AppProps } from "next/app";
import React from "react";
import { SWRConfiguration } from "swr";

declare module "next" {
  export type NextPageWithLayout<P = {}, IP = P> = NextPage<
    P & Pick<SWRConfiguration, "fallback">,
    IP
  > & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
  };

  type InitialAppProps = Pick<SWRConfiguration, "fallback"> & {};

  export type AppPropsWithLayout = AppProps<InitialAppProps> & {
    Component: NextPageWithLayout;
  };
}
