import React from "react";

export type DefaultLayoutProps = React.PropsWithChildren<{}>;

export const DefaultLayout = (props: DefaultLayoutProps) => {
  const { children } = props;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-10 lg:p-24">
      {children}
    </main>
  );
};
