import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./components/Authentication/AuthPage";
import { Provider } from "react-redux";
import store from "./store/store";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import HomePage from "./pages/HomePage";
import PostJobPage from "./pages/PostJobPage";
import FindJobPage from "./pages/FindJobPage";
import Unauthorized from "./components/Authentication/Unauthorized";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/signup",
    element: <AuthPage />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "Employer"]}>
            <PostJobPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/find-job",
        element: <FindJobPage />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
