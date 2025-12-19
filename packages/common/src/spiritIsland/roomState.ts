export type InventoryT = {
  name: string;
  quantity: number;
};

export type PlayerT = {
  name: string;
  x: number;
  y: number;
  inventory: InventoryT[];
};

export type SpiritIslandRoomStatT = {
  players: Record<string, PlayerT>;
};
