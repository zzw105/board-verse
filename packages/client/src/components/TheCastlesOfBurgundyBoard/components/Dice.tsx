import { useContext } from "react";

import { DicePointsEnum, StateEnum } from "@game/shared";
import { message } from "antd";
import { Group, Image } from "react-konva";
import useImage from "use-image";

import img from "../../../assets/theCastlesOfBurgundyMonorepo/imgs/dice.png";
import { ShadowBlurEnum, ShadowColorEnum } from "../../../enum/game";
import { BoardContext, UserBoardContext } from "../../../store/BoardContext";
import { useTheCastlesOfBurgundyStore } from "../../../store/useTheCastlesOfBurgundyStore";

interface Props {
  x: number;
  y: number;
  point: DicePointsEnum | StateEnum.EMPTY;
  type: number;
  id: string;
  center?: boolean;
}

export const Dice = ({ x, y, point, type, id, center }: Props) => {
  const { boardPlayerInfo } = useContext(UserBoardContext);

  const { nowPlayingPlayerID, clientPlayerID } = useContext(BoardContext);

  const canOperation =
    boardPlayerInfo && nowPlayingPlayerID === clientPlayerID && clientPlayerID === boardPlayerInfo.id;

  const { choiceDice, setChoiceDice } = useTheCastlesOfBurgundyStore();
  const imageWidth = 420 / 6;
  const imageHeight = 350 / 5;
  const imageScale = 0.5;

  const cropFrame = {
    x: point === StateEnum.EMPTY ? 0 : point - 1,
    y: type,
  };

  const [image] = useImage(img);

  if (point === StateEnum.EMPTY) {
    return null;
  }

  return (
    <Group
      x={x}
      y={y}
      offsetX={center ? (imageWidth / 2) * imageScale : 0}
      offsetY={center ? (imageHeight / 2) * imageScale : 0}
      // onContextMenu={(e) => isCurrent && canOperations && handleContextMenu({ e, type: "token", name: type })}
      onMouseOver={() => {
        if (canOperation) {
          document.body.style.cursor = "pointer";
        }
      }}
      onMouseOut={() => {
        if (canOperation) {
          document.body.style.cursor = "default";
        }
      }}
      onClick={() => {
        if (canOperation) {
          setChoiceDice({ playerId: clientPlayerID, dicePoint: point, id });
          message.info(`选择了 ${point}点 骰子，请选择对应操作`);
        }
      }}
    >
      <Image
        image={image}
        shadowBlur={ShadowBlurEnum.TOKEN}
        width={imageWidth}
        height={imageHeight}
        scale={{ x: imageScale, y: imageScale }}
        crop={{
          x: cropFrame.x * imageWidth,
          y: cropFrame.y * imageHeight,
          width: imageWidth,
          height: imageHeight,
        }}
        shadowColor={
          choiceDice.id === id
            ? ShadowColorEnum.SELECT
            : canOperation
              ? ShadowColorEnum.CAN_OPERATE
              : ShadowColorEnum.DEFAULT
        }
      />
    </Group>
  );
};
