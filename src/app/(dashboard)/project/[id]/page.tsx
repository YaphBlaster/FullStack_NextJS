import TaskCard from "@/components/TaskCard";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import React from "react";

const getData = async (id: string) => {
  //Always have to authenticate the user
  const user = await getUserFromCookie(cookies());
  const project = await db.project.findFirst({
    where: { id, ownerId: user?.id },
    include: {
      tasks: true,
    },
  });

  return project;
};

type Props = {
  params: {
    id: string;
  };
};

const Project = async ({ params }: Props) => {
  const project = await getData(params.id);
  return (
    <div className="h-full overflow-y-auto pr-6 w-1/1">
      {/* @ts-expect-error Server Component - Needed because TypeScript has a hard time with async ServerComponents*/}
      <TaskCard tasks={project?.tasks} title={project?.name} />
    </div>
  );
};

export default Project;
