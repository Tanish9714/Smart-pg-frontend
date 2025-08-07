import { createBrowserRouter } from "react-router-dom";
import App from "./src/App";
import Dashboard from "./src/pages/Dashboard";
import AddActivity from "./src/pages/AddActivity";
import Tenants from "./src/pages/Tenants";
import TenantsForm from "./src/components/TenantsForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "add-activity",
        element: <AddActivity />,
      },
      {
        path: "tenants",
        element: <Tenants />,
        children: [
          {
            path: "new",
            element: <TenantsForm />,
          },
        ],
      },
    ],
  },
]);

export default router;
