import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { Search } from "./pages/Search/Search";
import { GlobalStyled } from "./GlobalStyled";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { Authentication } from "./pages/Authentication/Authentication";
import { Profile } from "./pages/Profile/Profile";
import UserProvider from "./Context/UserContext";
import { ManageNews } from "./pages/ManageNews/ManageNews";
import { ManageInsurances } from "./pages/ManageInsurance/ManageInsurances";
import { ManageInsurers } from  "./pages/ManageInsurer/ManageInsurer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search/:title",
        element: <Search />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/manage-news-insurances/:action/:id",
        element: <ManageInsurances   />,
      },
      {
        path: "/manage-news-insurers/:action/:id",
        element: <ManageInsurers />
      }
    ],
  },
  {
    path: "/auth",
    element: <Authentication />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyled />
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
