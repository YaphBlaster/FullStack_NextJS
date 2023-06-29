import React, { PropsWithChildren } from "react";
import clsx from "clsx";

type Props = {
  className?: string;
};

const Card = ({ children, className }: PropsWithChildren<Props>) => {
  return (
    <div
      className={clsx(
        "rounded-3xl px-10 py-4 drop-shadow-xl bg-white",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
