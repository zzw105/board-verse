import { ArraySchema, MapSchema, Schema, type } from "@colyseus/schema";

export class Inventory extends Schema {
  @type("string") name = "";
  @type("number") quantity = 0;
}

export class Player extends Schema {
  @type("string") name = "";
  @type("number") x = 0;
  @type("number") y = 0;

  @type([Inventory]) inventory = new ArraySchema<Inventory>();
}

export class mapT extends Schema {}

export class SpiritIslandRoomState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
  @type({ map: mapT }) map = new MapSchema<mapT>();
}
