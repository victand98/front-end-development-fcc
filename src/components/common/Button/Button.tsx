import classNames from "classnames";
import React from "react";

export type ButtonProps = React.PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;

export const Button: React.FC<ButtonProps> = (props) => {
  const { className, children, ...rest } = props;

  const buttonClass = classNames(
    "px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold disabled:opacity-50",
    className
  );

  return (
    <button className={buttonClass} {...rest}>
      {children}
    </button>
  );
};

Button.defaultProps = { type: "button" };
