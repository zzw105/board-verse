import { SP_CardObj, type SP_CardType } from "@game/shared";
import { Text } from "react-konva";

import { use_SP_Store } from "../../../store/useSplendorPokemonStore";

interface Props {
  cardInfo: SP_CardType;
}

export const PokemonCardDebugInfo = ({ cardInfo }: Props) => {
  const isDebug = use_SP_Store((state) => state.isDebug);
  if (!isDebug) {
    return null;
  }
  return (
    <>
      {/* // 花费 */}
      <>
        <Text
          x={60 / 2.5}
          y={210 / 2.5}
          text={cardInfo.cost.black + ""}
          fontSize={25 / 2.5}
          fill="black"
          stroke="#fff"
          strokeWidth={0.2}
        />
        <Text
          x={60 / 2.5}
          y={170 / 2.5}
          text={cardInfo.cost.blue + ""}
          fontSize={25 / 2.5}
          fill="blue"
          stroke="#fff"
          strokeWidth={0.2}
        />
        <Text
          x={60 / 2.5}
          y={130 / 2.5}
          text={cardInfo.cost.pink + ""}
          fontSize={25 / 2.5}
          fill="pink"
          stroke="#fff"
          strokeWidth={0.2}
        />
        <Text
          x={60 / 2.5}
          y={90 / 2.5}
          text={cardInfo.cost.red + ""}
          fontSize={25 / 2.5}
          fill="red"
          stroke="#fff"
          strokeWidth={0.2}
        />
        <Text
          x={60 / 2.5}
          y={50 / 2.5}
          text={cardInfo.cost.yellow + ""}
          fontSize={25 / 2.5}
          fill="yellow"
          stroke="#fff"
          strokeWidth={0.2}
        />
        <Text
          x={60 / 2.5}
          y={10 / 2.5}
          text={cardInfo.cost.purple + ""}
          fontSize={25 / 2.5}
          fill="purple"
          stroke="#fff"
          strokeWidth={0.2}
        />
      </>
      {/* 升级 */}
      <>
        <Text
          x={110 / 2.5}
          y={210 / 2.5}
          text={cardInfo.evolvesCost.black + ""}
          fontSize={25 / 2.5}
          fill="black"
          stroke="#fff"
          strokeWidth={0.2}
        />
        <Text
          x={110 / 2.5}
          y={170 / 2.5}
          text={cardInfo.evolvesCost.blue + ""}
          fontSize={25 / 2.5}
          fill="blue"
          stroke="#fff"
          strokeWidth={0.2}
        />
        <Text
          x={110 / 2.5}
          y={130 / 2.5}
          text={cardInfo.evolvesCost.pink + ""}
          fontSize={25 / 2.5}
          fill="pink"
          stroke="#fff"
          strokeWidth={0.2}
        />
        <Text
          x={110 / 2.5}
          y={90 / 2.5}
          text={cardInfo.evolvesCost.red + ""}
          fontSize={25 / 2.5}
          fill="red"
          stroke="#fff"
          strokeWidth={0.2}
        />
        <Text
          x={110 / 2.5}
          y={50 / 2.5}
          text={cardInfo.evolvesCost.yellow + ""}
          fontSize={25 / 2.5}
          fill="yellow"
          stroke="#fff"
          strokeWidth={0.2}
        />
        <Text
          x={110 / 2.5}
          y={10 / 2.5}
          text={cardInfo.evolvesCost.purple + ""}
          fontSize={25 / 2.5}
          fill="purple"
          stroke="#fff"
          strokeWidth={0.2}
        />
      </>

      {/* 抵用 */}
      <>
        <Text
          x={200 / 2.5}
          y={210 / 2.5}
          text={cardInfo.offset.black + ""}
          fontSize={25 / 2.5}
          fill="black"
          stroke="#fff"
          strokeWidth={0.2}
        />
        <Text
          x={200 / 2.5}
          y={170 / 2.5}
          text={cardInfo.offset.blue + ""}
          fontSize={25 / 2.5}
          fill="blue"
          stroke="#fff"
          strokeWidth={0.2}
        />
        <Text
          x={200 / 2.5}
          y={130 / 2.5}
          text={cardInfo.offset.pink + ""}
          fontSize={25 / 2.5}
          fill="pink"
          stroke="#fff"
          strokeWidth={0.2}
        />
        <Text
          x={200 / 2.5}
          y={90 / 2.5}
          text={cardInfo.offset.red + ""}
          fontSize={25 / 2.5}
          fill="red"
          stroke="#fff"
          strokeWidth={0.2}
        />
        <Text
          x={200 / 2.5}
          y={50 / 2.5}
          text={cardInfo.offset.yellow + ""}
          fontSize={25 / 2.5}
          fill="yellow"
          stroke="#fff"
          strokeWidth={0.2}
        />
        <Text
          x={200 / 2.5}
          y={10 / 2.5}
          text={cardInfo.offset.purple + ""}
          fontSize={25 / 2.5}
          fill="purple"
          stroke="#fff"
          strokeWidth={0.2}
        />
      </>

      {/* 分数 */}
      <Text
        x={-20 / 2.5}
        y={0 / 2.5}
        text={cardInfo.point + ""}
        fontSize={25 / 2.5}
        fill="purple"
        stroke="#080808ff"
        strokeWidth={0.2}
      />
      {/* 进化 */}
      <>
        {cardInfo.evolvesTo.map((evolvesTo, index) => (
          <Text
            key={SP_CardObj[evolvesTo].id}
            x={(-20 + index * 130) / 2.5}
            y={-20 / 2.5}
            text={SP_CardObj[evolvesTo].name}
            fontSize={25 / 2.5}
            fill="white"
            stroke="#080808ff"
            strokeWidth={0.2}
          />
        ))}
      </>
      <Text
        key={cardInfo.id}
        x={220 / 2.5}
        y={200 / 2.5}
        text={cardInfo.name + cardInfo.id}
        fontSize={25 / 2.5}
        fill="white"
        stroke="#080808ff"
        strokeWidth={0.2}
      />
    </>
  );
};
