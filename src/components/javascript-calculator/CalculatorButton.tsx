import classNames from "classnames";
import React from "react";
import { Button, ButtonProps } from "../common";

export type CalculatorButtonProps = ButtonProps;

export const CalculatorButton: React.FC<CalculatorButtonProps> = (props) => {
  const { className, ...rest } = props;
  const buttonClass = classNames(
    "bg-slate-500 hover:bg-slate-600 text-white font-bold rounded-none",
    className
  );

  return <Button className={buttonClass} {...rest} />;
};
