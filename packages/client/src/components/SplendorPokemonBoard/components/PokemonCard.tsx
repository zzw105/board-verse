import { useEffect, useRef, useState } from "react";

import { type SP_CardIdType, SP_CardObj } from "@game/shared";
import Konva from "konva";
import { Tween } from "konva/lib/Tween";
import { Group, Image, Text } from "react-konva";
import useImage from "use-image";

import backImg from "../../../assets/splendorPokemon/img/card/card_back_1.png";
import { ShadowBlurEnum } from "../../../enum/game";
import { ImgMap } from "../imgMap";
import { PokemonCardDebugInfo } from "./PokemonCard copy";

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
        <Image image={image} shadowBlur={ShadowBlurEnum.BACKGROUND_TOKEN} width={imageWidth} height={imageHeight} />
      )}
      {backImage && !nowIsFaceUp && (
        <Image image={backImage} shadowBlur={ShadowBlurEnum.BACKGROUND_TOKEN} width={imageWidth} height={imageHeight} />
      )}
      <PokemonCardDebugInfo cardInfo={cardInfo} />
    </Group>
  );
};
