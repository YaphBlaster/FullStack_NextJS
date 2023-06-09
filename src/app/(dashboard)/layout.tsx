import "@/styles/global.css";
import GlassPane from "@/components/GlassPane";
import React, { PropsWithChildren } from "react";

type Props = {};

const DashboardRootLayout = ({ children }: PropsWithChildren<Props>) => {
  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen rainbow-mesh p-6">
        <GlassPane className="w-full h-full p-6 flex align-center container mx-auto">
          <main className="w-full pl-6 h-full">{children}</main>
        </GlassPane>
      </body>
    </html>
  );
};

export default DashboardRootLayout;
