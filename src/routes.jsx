import { createBrowserRouter } from "react-router-dom";

// layouts and middleware
import MainLayout from "@/layouts/main-layout";
import PrivateRoute from "@/hooks/private-route";

// pages
import Homepage from "@/pages/Home/index";
import LoginPage from "@/pages/auth/login/login";
import RegisterPage from "@/pages/auth/register/register";
import ForgotPasswordPage from "@/pages/auth/forgot-password/forgot-password";
import CheckEmailPage from "@/pages/auth/forgot-password/check-email";
import ResetPasswordPage from "@/pages/auth/forgot-password/reset-password";
import ErrorPage from "@/pages/_additional/error-page";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [{ path: "/", element: <Homepage /> }],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  {
    path: "/forgot-password/check-email",
    element: <CheckEmailPage />,
  },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
