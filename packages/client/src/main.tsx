import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/less/index.less";
import "./assets/less/reset.less";
import "@ant-design/v5-patch-for-react-19";
import { message } from "antd";
import { loadAllImg } from "./utils/loadAllImg.ts";

window.onerror = (errMessage) => {
  let msg: string;
  if (typeof errMessage === "string") {
    // 普通 JS 错误
    msg = errMessage.replace(/^(Uncaught\s+)?(Error:?\s*)?/, "");
  } else if (errMessage instanceof Event) {
    // 资源加载错误
    const target = errMessage.target as HTMLScriptElement | HTMLImageElement | null;
    if (target) {
      msg = `资源加载失败: ${target.tagName} ${target.src}`;
    } else {
      msg = "资源加载失败: 未知元素";
    }
  } else {
    msg = "未知错误";
  }

  message.error(msg);
};

loadAllImg();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
