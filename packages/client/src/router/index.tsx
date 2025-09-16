import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Splendor from "../pages/Splendor/Splendor";
import Colyseus from "../pages/Colyseus/Colyseus";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/splendor",
    element: <Splendor />,
  },
  {
    path: "/colyseus",
    element: <Colyseus />,
  },
]);

export default router;
