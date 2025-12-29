import type { PlayerSchemaT } from "./PlayerSchemaT";
import type { mapSchemaT } from "./mapSchemaT";
export interface SpiritIslandRoomSchemaT {
  players: Record<string, PlayerSchemaT>;
  map: Record<string, mapSchemaT>;
}