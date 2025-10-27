import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import Splendor from "../pages/Splendor/Splendor";
import SplendorPokemon from "../pages/SplendorPokemon/SplendorPokemon";
import TheCastlesOfBurgundy from "../pages/TheCastlesOfBurgundy/TheCastlesOfBurgundy";

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
    {
      path: "/the-castles-of-burgundy",
      element: <TheCastlesOfBurgundy />,
    },
    {
      path: "/splendor-pokemon",
      element: <SplendorPokemon />,
    },
  ],
  {
    // 关键：设置 base 路径
    basename: "/game",
  },
);

export default router;
