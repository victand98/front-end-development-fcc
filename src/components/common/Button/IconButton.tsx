import React from "react";
import { IconType } from "react-icons";
import classNames from "classnames";
import { Button, ButtonProps } from "./Button";

export type IconButtonProps = ButtonProps & { icon: IconType; label: string };

export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  label,
  className,
  ...rest
}) => {
  const buttonClass = classNames(
    "flex items-center justify-center space-x-2 px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold disabled:opacity-50",
    className
  );

  return (
    <Button className={buttonClass} {...rest}>
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Button>
  );
};
