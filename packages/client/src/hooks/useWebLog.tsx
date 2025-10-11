import { useEffect, useRef } from "react";

import type { LogsItemType } from "@game/shared";
import { message } from "antd";

export function useGameLogs(logs: LogsItemType[]) {
  const lastCount = useRef<LogsItemType | null>(null);

  useEffect(() => {
    const lastLog = logs[logs.length - 1];
    if (lastLog.message === lastCount.current?.message) return;
    console.log(lastLog.message);
    if (!lastLog.webShow) return;
    lastCount.current = lastLog;
    switch (lastLog.type) {
      case "success":
        message.success(lastLog.message);
        break;
      case "error":
        message.error(lastLog.message);
        break;
      case "info":
        message.info(lastLog.message);
        break;
      case "warning":
        message.warning(lastLog.message);
        break;
      default:
        break;
    }
  }, [logs]);
}
