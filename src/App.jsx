import React from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";

// hooks
import useAuth from "./hooks/useAuth";
import { routes } from "./routes";

// styles
import "@/assets/styles/layout.css";
import "@/assets/styles/typography.css";

const App = () => {
  const { isLoading, authChecked } = useAuth();

  if (!authChecked || isLoading) {
    return (
      <div className="h-screen w-screen center fixed bg-[#15161b] z-50">
        LOADING
      </div>
    );
  }
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
};

export default App;
