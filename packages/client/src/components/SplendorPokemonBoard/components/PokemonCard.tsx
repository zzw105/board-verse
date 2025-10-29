import { useEffect, useRef, useState } from "react";

import { type SP_CardIdType, SP_CardObj } from "@game/shared";
import Konva from "konva";
import { Tween } from "konva/lib/Tween";
import { Group, Image, Text } from "react-konva";
import useImage from "use-image";

import backImg from "../../../assets/splendorPokemon/img/card/card_back_1.png";
import { ShadowBlurEnum } from "../../../enum/game";
import { ImgMap } from "../imgMap";

interface Props {
  x: number;
  y: number;
  isFaceUp: boolean;
  id: SP_CardIdType;
  center?: boolean;
  isHorizontal?: boolean;
  onClick?: () => void;
}

export const PokemonCard = ({ x, y, id, center, isFaceUp, isHorizontal, onClick }: Props) => {
  const a = 5;
  const imageWidth = 900 / a;
  const imageHeight = 1200 / a;
  const imageScale = 0.08 * a;

  const cardInfo = SP_CardObj[id];

  const [image] = useImage(ImgMap[id]);
  const [backImage] = useImage(backImg);
  // 锁定
  // useEffect(() => {
  //   const g = groupRef.current;
  //   if (g && image) {
  //     g.cache();
  //   }
  // }, [image, id]);

  // 卡片组
  const groupRef = useRef<Konva.Group>(null);
  // 卡片移动动画
  const tweenRef = useRef<Tween | null>(null);
  // 卡片翻牌动画
  const flipTweenRef = useRef<Tween | null>(null);
  // 卡片翻牌动画
  const horizontalTweenRef = useRef<Tween | null>(null);
  // 当前翻转状态
  const [nowIsFaceUp, setNowIsFaceUp] = useState(isFaceUp);

  // 平滑移动动画
  useEffect(() => {
    if (!groupRef.current) return;
    if (tweenRef.current) tweenRef.current.finish();
    const g = groupRef.current;
    tweenRef.current = new Tween({
      node: groupRef.current,
      duration: 0.4,
      x: x + (imageWidth * imageScale) / 2,
      y: y + (imageHeight * imageScale) / 2,
      easing: Konva.Easings.EaseInOut,
      onFinish: () => {
        tweenRef.current = null;
        if (g.width() > 0 && g.height() > 0) {
          g.cache();
        }
      },
    });
    g.clearCache();
    tweenRef.current.play();
  }, [x, y]);

  // 翻牌动画
  useEffect(() => {
    if (!groupRef.current) return;
    const g = groupRef.current;

    if (nowIsFaceUp !== isFaceUp) {
      if (flipTweenRef.current) flipTweenRef.current.finish();
      flipTweenRef.current = new Tween({ node: g, duration: 0.1, scaleX: 0 });
      flipTweenRef.current.onFinish = () => {
        setNowIsFaceUp(isFaceUp);
        // g.scaleX(isFaceUp ? scale : -scale); // 根据外部状态直接翻牌
        flipTweenRef.current = new Tween({ node: g, duration: 0.1, scaleX: imageScale });
        flipTweenRef.current.onFinish = () => {
          g.cache();
        };
        flipTweenRef.current.play();
      };
      g.clearCache();
      flipTweenRef.current.play();
    }
  }, [isFaceUp, nowIsFaceUp]);

  // 横置动画
  useEffect(() => {
    if (!groupRef.current) return;
    const g = groupRef.current;

    if (horizontalTweenRef.current) horizontalTweenRef.current.finish();
    horizontalTweenRef.current = new Tween({ node: g, duration: 0.1, rotation: isHorizontal ? -90 : 0 });
    horizontalTweenRef.current.onFinish = () => {};
    horizontalTweenRef.current.play();
  }, [isHorizontal]);

  return (
    <Group
      ref={groupRef}
      scaleX={imageScale}
      scaleY={imageScale}
      offsetX={imageWidth / 2}
      offsetY={imageHeight / 2}
      onClick={() => onClick?.()}
      // onContextMenu={(e) => isCurrent && canOperations && handleContextMenu({ e, type: "token", name: type })}
    >
      {image && nowIsFaceUp && (
        <>
          <Image image={image} shadowBlur={ShadowBlurEnum.BACKGROUND_TOKEN} width={imageWidth} height={imageHeight} />
          {/* // 花费 */}
          <>
            <Text
              x={60}
              y={210}
              text={cardInfo.cost.black + ""}
              fontSize={25}
              fill="black"
              stroke="#fff"
              strokeWidth={0.2}
            />
            <Text
              x={60}
              y={170}
              text={cardInfo.cost.blue + ""}
              fontSize={25}
              fill="blue"
              stroke="#fff"
              strokeWidth={0.2}
            />
            <Text
              x={60}
              y={130}
              text={cardInfo.cost.pink + ""}
              fontSize={25}
              fill="pink"
              stroke="#fff"
              strokeWidth={0.2}
            />
            <Text
              x={60}
              y={90}
              text={cardInfo.cost.red + ""}
              fontSize={25}
              fill="red"
              stroke="#fff"
              strokeWidth={0.2}
            />
            <Text
              x={60}
              y={50}
              text={cardInfo.cost.yellow + ""}
              fontSize={25}
              fill="yellow"
              stroke="#fff"
              strokeWidth={0.2}
            />
            <Text
              x={60}
              y={10}
              text={cardInfo.cost.purple + ""}
              fontSize={25}
              fill="purple"
              stroke="#fff"
              strokeWidth={0.2}
            />
          </>
          {/* 升级 */}
          <>
            <Text
              x={110}
              y={210}
              text={cardInfo.evolvesCost.black + ""}
              fontSize={25}
              fill="black"
              stroke="#fff"
              strokeWidth={0.2}
            />
            <Text
              x={110}
              y={170}
              text={cardInfo.evolvesCost.blue + ""}
              fontSize={25}
              fill="blue"
              stroke="#fff"
              strokeWidth={0.2}
            />
            <Text
              x={110}
              y={130}
              text={cardInfo.evolvesCost.pink + ""}
              fontSize={25}
              fill="pink"
              stroke="#fff"
              strokeWidth={0.2}
            />
            <Text
              x={110}
              y={90}
              text={cardInfo.evolvesCost.red + ""}
              fontSize={25}
              fill="red"
              stroke="#fff"
              strokeWidth={0.2}
            />
            <Text
              x={110}
              y={50}
              text={cardInfo.evolvesCost.yellow + ""}
              fontSize={25}
              fill="yellow"
              stroke="#fff"
              strokeWidth={0.2}
            />
            <Text
              x={110}
              y={10}
              text={cardInfo.evolvesCost.purple + ""}
              fontSize={25}
              fill="purple"
              stroke="#fff"
              strokeWidth={0.2}
            />
          </>

          {/* 抵用 */}
          <>
            <Text
              x={200}
              y={210}
              text={cardInfo.offset.black + ""}
              fontSize={25}
              fill="black"
              stroke="#fff"
              strokeWidth={0.2}
            />
            <Text
              x={200}
              y={170}
              text={cardInfo.offset.blue + ""}
              fontSize={25}
              fill="blue"
              stroke="#fff"
              strokeWidth={0.2}
            />
            <Text
              x={200}
              y={130}
              text={cardInfo.offset.pink + ""}
              fontSize={25}
              fill="pink"
              stroke="#fff"
              strokeWidth={0.2}
            />
            <Text
              x={200}
              y={90}
              text={cardInfo.offset.red + ""}
              fontSize={25}
              fill="red"
              stroke="#fff"
              strokeWidth={0.2}
            />
            <Text
              x={200}
              y={50}
              text={cardInfo.offset.yellow + ""}
              fontSize={25}
              fill="yellow"
              stroke="#fff"
              strokeWidth={0.2}
            />
            <Text
              x={200}
              y={10}
              text={cardInfo.offset.purple + ""}
              fontSize={25}
              fill="purple"
              stroke="#fff"
              strokeWidth={0.2}
            />
          </>

          {/* 分数 */}
          <Text
            x={-20}
            y={0}
            text={cardInfo.point + ""}
            fontSize={25}
            fill="purple"
            stroke="#080808ff"
            strokeWidth={0.2}
          />
        </>
      )}
      {backImage && !nowIsFaceUp && (
        <Image image={backImage} shadowBlur={ShadowBlurEnum.BACKGROUND_TOKEN} width={imageWidth} height={imageHeight} />
      )}
    </Group>
  );
};
