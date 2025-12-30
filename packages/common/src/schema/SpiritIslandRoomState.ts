import { ArraySchema, MapSchema, Schema, type } from "@colyseus/schema";

// export class Inventory extends Schema {
//   @type("string") name = "";
//   @type("number") quantity = 0;
// }

export class PlayerSchema extends Schema {
  @type("string") name = "";
  @type("number") x = 0;
  @type("number") y = 0;

  // @type([Inventory]) inventory = new ArraySchema<Inventory>();
}

export class mapSchema extends Schema {
  @type("string") name = "";
}

export class SpiritIslandRoomSchema extends Schema {
  @type({ map: PlayerSchema }) players = new MapSchema<PlayerSchema>();
  @type({ map: mapSchema }) map = new MapSchema<mapSchema>();
}
