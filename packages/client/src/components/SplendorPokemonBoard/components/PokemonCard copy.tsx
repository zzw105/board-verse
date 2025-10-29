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
          x={60}
          y={210}
          text={cardInfo.cost.black + ""}
          fontSize={25}
          fill="black"
          stroke="#fff"
          strokeWidth={0.2}
        />
        <Text x={60} y={170} text={cardInfo.cost.blue + ""} fontSize={25} fill="blue" stroke="#fff" strokeWidth={0.2} />
        <Text x={60} y={130} text={cardInfo.cost.pink + ""} fontSize={25} fill="pink" stroke="#fff" strokeWidth={0.2} />
        <Text x={60} y={90} text={cardInfo.cost.red + ""} fontSize={25} fill="red" stroke="#fff" strokeWidth={0.2} />
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
        <Text x={200} y={90} text={cardInfo.offset.red + ""} fontSize={25} fill="red" stroke="#fff" strokeWidth={0.2} />
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
      <Text x={-20} y={0} text={cardInfo.point + ""} fontSize={25} fill="purple" stroke="#080808ff" strokeWidth={0.2} />
      {/* 进化 */}
      <>
        {cardInfo.evolvesTo.map((evolvesTo, index) => (
          <Text
            key={SP_CardObj[evolvesTo].name}
            x={-20 + index * 130}
            y={-20}
            text={SP_CardObj[evolvesTo].name}
            fontSize={25}
            fill="white"
            stroke="#080808ff"
            strokeWidth={0.2}
          />
        ))}
      </>
      <Text
        key={cardInfo.name}
        x={220}
        y={200}
        text={cardInfo.name + cardInfo.id}
        fontSize={25}
        fill="white"
        stroke="#080808ff"
        strokeWidth={0.2}
      />
    </>
  );
};
