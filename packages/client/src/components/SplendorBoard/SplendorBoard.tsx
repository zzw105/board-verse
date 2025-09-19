import type { BoardProps } from "boardgame.io/dist/types/packages/react";
import { Stage, Layer, Rect } from "react-konva";
import styles from "./SplendorBoard.module.less";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SplendorGameTokenNameType, SplendorGameType, TokensObjType } from "@game/shared";
import { eventBus, type Events } from "../../utils/eventBus";
import { MenuItemKeyEnum, OperationKeyEnum } from "../../enum/game";
import { useContextMenuStore } from "../../store/useContextMenuStore";
import { Button, message } from "antd";
import { generateCardJSX, generateTokenJSX, isTokenSelect2, isTokenSelectHasThreeOnes } from "../../utils";
import { CurrentPlayerDashboard } from "./components/CurrentPlayerDashboard";
import { useUserStore } from "../../store/useUserStore";
import { useNavigate } from "react-router-dom";

export function SplendorBoard(data: BoardProps<SplendorGameType>) {
  console.log(123, data);

  const { name, setIsCurrent, isCurrent, setStagesType, stagesType } = useUserStore();

  if (isCurrent !== (data.playerID === data.ctx.currentPlayer)) {
    setIsCurrent(data.playerID === data.ctx.currentPlayer);
  }

  const nowStagesType = (data.playerID !== null && data.ctx.activePlayers?.[data.playerID]) || "";
  if (stagesType !== nowStagesType) {
    setStagesType(nowStagesType);
    switch (nowStagesType) {
      case "discard":
        message.warning("当前阶段为丢弃宝石阶段，不能进行其他操作");
        break;
    }
  }

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
  const originalStageSize = { width: 1770 * 2, height: 911 * 2 };
  // 缩放比例
  const scale = Math.min(stageSize.width / originalStageSize.width, stageSize.height / originalStageSize.height);

  // 处理显示卡片的信息
  const cardPositionX: Record<number, number> = {
    1: 30 * 2,
    2: 300 * 2,
    3: 430 * 2,
    4: 560 * 2,
    5: 690 * 2,
  };
  const cardPositionY: Record<number, number> = {
    0: 30 * 2,
    1: 210 * 2,
    2: 390 * 2,
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
      x: 830 * 2,
      y: 110 * 2,
    },
    blue: {
      x: 830 * 2,
      y: 290 * 2,
    },
    white: {
      x: 830 * 2,
      y: 470 * 2,
    },
    black: {
      x: 950 * 2,
      y: 110 * 2,
    },
    green: {
      x: 950 * 2,
      y: 290 * 2,
    },
    gold: {
      x: 950 * 2,
      y: 470 * 2,
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
  const menuItemOnClickHandler = useCallback(
    (e: Events["menuItemOnClick"]) => {
      const { type } = e;
      switch (type) {
        case MenuItemKeyEnum.BUY:
          data.moves.buyCard(nowGroupName);
          break;
        case MenuItemKeyEnum.LOCKING:
          data.moves.lockCard(nowGroupName);
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
  const operationOnClickHandler = useCallback(
    (e: Events["operationOnClick"]) => {
      const { type, name } = e;
      switch (type) {
        case OperationKeyEnum.RETURN_TOKEN:
          data.moves.discardToken(name);
          break;
      }
    },
    [data.moves]
  );

  // 绑定事件
  useEffect(() => {
    eventBus.on("menuItemOnClick", menuItemOnClickHandler);
    return () => eventBus.off("menuItemOnClick", menuItemOnClickHandler);
  }, [menuItemOnClickHandler]);
  useEffect(() => {
    eventBus.on("operationOnClick", operationOnClickHandler);
    return () => eventBus.off("operationOnClick", operationOnClickHandler);
  }, [operationOnClickHandler]);

  const navigate = useNavigate();

  if (data.playerID === null) {
    return <div>playerID为空</div>;
  }
  return (
    <div className={styles["splendor-board"]}>
      <div className={styles.title}>
        {name}
        <Button
          size="large"
          onClick={() => {
            data.moves.gameReset();
          }}
        >
          重置
        </Button>
        <Button
          size="large"
          onClick={() => {
            navigate("/");
          }}
        >
          返回
        </Button>
        <div>
          当前玩家
          {data.matchData?.find((item) => item.id === +data.ctx.currentPlayer)?.name}
        </div>
      </div>
      <div ref={konvaRef} className={styles["konva"]}>
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          scaleX={scale}
          scaleY={scale}
          pixelRatio={4}
          onContextMenu={(e) => e.evt.preventDefault()}
        >
          <Layer>
            <Rect
              stroke="#555"
              strokeWidth={3}
              fill="rgba(208, 232, 240, 0.5)" // 半透明淡蓝色 (浅蓝+透明度0.5)
              x={10 * 2}
              y={10 * 2}
              width={1070 * 2}
              height={560 * 2} // 近似高度
              shadowColor="black"
              shadowBlur={10}
              shadowOpacity={0.2}
              cornerRadius={10}
            />
            {level3CardJSX}
            {level2CardJSX}
            {level1CardJSX}
            {tokenJSX}
            <CurrentPlayerDashboard playerInfo={data.G.players[data.playerID]}></CurrentPlayerDashboard>
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
