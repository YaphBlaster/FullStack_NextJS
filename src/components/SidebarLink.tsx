"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Calendar,
  Grid,
  Icon as IconType,
  Settings,
  User,
} from "react-feather";

const icons = { Settings, User, Grid, Calendar };
export type iconsType = keyof typeof icons;

type Props = {
  linkObject: {
    link: string;
    icon: iconsType;
  };
};

const SidebarLink = ({ linkObject }: Props) => {
  const pathname = usePathname();
  let isActive = false;

  if (pathname === linkObject.link) {
    isActive = true;
  }

  const Icon = icons[linkObject.icon];
  return (
    <div>
      <Icon
        className={clsx(
          "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
          isActive && "stroke-violet-600"
        )}
      />
    </div>
  );
};

export default SidebarLink;
