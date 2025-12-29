import { Client, Room } from "@colyseus/core";

import { PlayerSchema, SpiritIslandRoomSchema, mapSchema } from "./schema/SpiritIslandRoomState";

export class SpiritIslandRoom extends Room<SpiritIslandRoomSchema> {
  maxClients = 4;
  state = new SpiritIslandRoomSchema();

  onCreate(options: any) {
    const player = new PlayerSchema();
    player.name = "abc";

    this.state.players.set("abc", player);

    const tile = new mapSchema();
    tile.name = "init";
    this.state.map.set("init", tile);
  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    console.log(this.state);
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
