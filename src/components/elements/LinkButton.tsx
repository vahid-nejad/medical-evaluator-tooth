import Link from "next/link";
import React from "react";
import { Button, IButtonProps } from ".";

interface IProps extends IButtonProps {
  href: string;
}

export const LinkButton = ({ href, children, ...props }: IProps) => {
  return (
    <Link href={href}>
      <Button {...props}>{children}</Button>
    </Link>
  );
};
