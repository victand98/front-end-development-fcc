import classNames from "classnames";
import React from "react";
import { IconType } from "react-icons";
import { Button, ButtonProps } from "./Button";

export type IconButtonProps = ButtonProps & { icon: IconType; label?: string };

export const IconButton: React.FC<IconButtonProps> = (props) => {
  const { className, icon: Icon, label, ...rest } = props;

  const buttonClass = classNames(
    "flex items-center justify-center space-x-2 py-3",
    className
  );

  return (
    <Button className={buttonClass} {...rest}>
      <Icon />
      {label && <span>{label}</span>}
    </Button>
  );
};
