import type { BoardProps } from "boardgame.io/dist/types/packages/react";
import { Stage, Layer } from "react-konva";
import styles from "./SplendorBoard.module.less";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SplendorGameTokenNameType, SplendorGameType, TokensObjType } from "@game/shared";
import { eventBus, type Events } from "../../utils/eventBus";
import { MenuItemKeyEnum } from "../../enum/game";
import { useContextMenuStore } from "../../store/useContextMenuStore";
import { Button, message } from "antd";
import { generateCardJSX, generateTokenJSX, isTokenSelect2, isTokenSelectHasThreeOnes } from "../../utils";

export function SplendorBoard(data: BoardProps<SplendorGameType>) {
  // konva外部容器
  const konvaRef = useRef<HTMLDivElement>(null);
  // 画布尺寸
  const [stageSize, setStageSize] = useState({ width: 300, height: 300 });
  // 动态修改画布尺寸
  useEffect(() => {
    const updateSize = () => {
      if (konvaRef.current) {
        setStageSize({
          width: konvaRef.current.offsetWidth,
          height: konvaRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  // 原始舞台设计尺寸
  const originalStageSize = { width: 1770, height: 911 };
  // 缩放比例
  const scale = Math.min(stageSize.width / originalStageSize.width, stageSize.height / originalStageSize.height);

  // 处理显示卡片的信息
  const cardPositionX: Record<number, number> = {
    1: 30,
    2: 300,
    3: 430,
    4: 560,
    5: 690,
  };
  const cardPositionY: Record<number, number> = {
    0: 30,
    1: 210,
    2: 390,
  };
  const level1Card = data.G.cards.filter((item) => item.level === 1);
  const level2Card = data.G.cards.filter((item) => item.level === 2);
  const level3Card = data.G.cards.filter((item) => item.level === 3);
  const level1CardJSX = generateCardJSX(level1Card, cardPositionX, cardPositionY, 1, 2);
  const level2CardJSX = generateCardJSX(level2Card, cardPositionX, cardPositionY, 1, 1);
  const level3CardJSX = generateCardJSX(level3Card, cardPositionX, cardPositionY, 1, 0);

  // 宝石筹码信息
  const tokenPosition: Record<SplendorGameTokenNameType, { x: number; y: number }> = {
    red: {
      x: 830,
      y: 110,
    },
    blue: {
      x: 830,
      y: 290,
    },
    white: {
      x: 830,
      y: 470,
    },
    black: {
      x: 950,
      y: 110,
    },
    green: {
      x: 950,
      y: 290,
    },
    gold: {
      x: 950,
      y: 470,
    },
  };
  const [nowSelectTokens, setNowSelectTokens] = useState<TokensObjType>({
    red: 0,
    blue: 0,
    white: 0,
    black: 0,
    green: 0,
    gold: 0,
  });
  const tokenJSX = generateTokenJSX(data.G.tokens, nowSelectTokens, tokenPosition);

  // 右键事件
  const { nowGroupName, nowSelectTokenName } = useContextMenuStore();
  const handler = useCallback(
    (e: Events["menuItemOnClick"]) => {
      const { type } = e;
      switch (type) {
        case MenuItemKeyEnum.BUY:
          data.moves.buyCard(nowGroupName);
          break;
        case MenuItemKeyEnum.LOCKING:
          console.log(222);
          break;
        case MenuItemKeyEnum.SELECT_TOKEN:
          if (!nowSelectTokenName) return;
          if (nowSelectTokens[nowSelectTokenName] === 1 && data.G.tokens[nowSelectTokenName] < 4) {
            message.warning("当前宝石小于4个，不可同时选择2个");
            return;
          }
          if (isTokenSelect2(nowSelectTokens)) {
            message.warning("已有宝石同时选择2个");
            return;
          }
          if (isTokenSelectHasThreeOnes(nowSelectTokens)) {
            message.warning("已有3个宝石同时选择1个");
            return;
          }
          setNowSelectTokens((d) => ({
            ...d,
            [nowSelectTokenName]: d[nowSelectTokenName] + 1,
          }));
          break;
        case MenuItemKeyEnum.CANCEL_TOKEN:
          if (!nowSelectTokenName) return;
          setNowSelectTokens((d) => ({
            ...d,
            [nowSelectTokenName]: 0,
          }));
          break;
        case MenuItemKeyEnum.CONFIRM_TOKEN:
          if (!Object.values(nowSelectTokens).some((v) => v > 0)) {
            message.warning("请选择至少一个宝石");
            return;
          }
          data.moves.selectToken(nowSelectTokens);
          setNowSelectTokens({
            red: 0,
            blue: 0,
            white: 0,
            black: 0,
            green: 0,
            gold: 0,
          });
          break;
      }
    },
    [data.moves, data.G.tokens, nowGroupName, nowSelectTokenName, nowSelectTokens]
  );

  // 绑定事件
  useEffect(() => {
    eventBus.on("menuItemOnClick", handler);
    return () => eventBus.off("menuItemOnClick", handler);
  }, [handler]);

  return (
    <div className={styles["splendor-board"]}>
      <div className={styles.title}>
        <Button
          size="large"
          onClick={() => {
            data.moves.gameReset();
          }}
        >
          重置
        </Button>
        {JSON.stringify(nowSelectTokens)}
      </div>
      <div ref={konvaRef} className={styles["konva"]}>
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          scaleX={scale}
          scaleY={scale}
          onContextMenu={(e) => e.evt.preventDefault()}
        >
          <Layer>
            {level3CardJSX}
            {level2CardJSX}
            {level1CardJSX}
            {tokenJSX}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
