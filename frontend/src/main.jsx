import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Layout from "./components/ui/Layout.jsx";
import { ScrollRestoration } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
const RouterLayout = () => {
  return (
    <Layout>
      <ScrollRestoration />
      <Outlet />
    </Layout>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouterLayout />,
    children: [{ path: "/", element: <App /> }],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
