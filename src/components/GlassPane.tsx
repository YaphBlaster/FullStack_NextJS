import clsx from "clsx";
import React, { PropsWithChildren } from "react";

type Props = {
  className?: string;
};

const GlassPane = ({ children, className }: PropsWithChildren<Props>) => {
  return (
    <div
      className={clsx(
        "glass rounded-2xl border-solid border-2 border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassPane;
