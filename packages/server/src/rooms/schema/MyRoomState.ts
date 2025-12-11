import { Schema, type } from "@colyseus/schema";

export class MyRoomState extends Schema {
  @type("number") x: number = 20;
  @type("number") y: number = 20;
  @type("number") count: number = 0;
}
