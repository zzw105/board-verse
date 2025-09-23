import type { TheCastlesOfBurgundyGameType } from "@game/shared";
import type { BoardProps } from "boardgame.io/dist/types/packages/react";

export function TheCastlesOfBurgundyBoard(data: BoardProps<TheCastlesOfBurgundyGameType>) {
  console.log(123, data);

  return <div></div>;
}
