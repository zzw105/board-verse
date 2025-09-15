import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/less/index.less";
import "./assets/less/reset.less";
import { loadAllImg } from "./utils/loadAllImg.ts";

loadAllImg().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
