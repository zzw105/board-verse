import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Splendor from "../pages/Splendor/Splendor";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/splendor",
      element: <Splendor />,
    },
  ],
  {
    // 关键：设置 base 路径
    basename: "/game",
  }
);

export default router;
