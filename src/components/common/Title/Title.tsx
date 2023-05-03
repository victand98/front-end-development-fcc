import React from "react";

export type TitleProps = React.PropsWithChildren<{}>;

export const Title: React.FC<TitleProps> = (props) => {
  return (
    <h1 className="text-2xl font-bold text-center mb-4 opacity-70">
      {props.children}
    </h1>
  );
};
