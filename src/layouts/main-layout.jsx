import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar/navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
