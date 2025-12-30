import { Client, Room } from "@colyseus/core";

import { PlayerSchema, SpiritIslandRoomS } from "../schema/SpiritIslandRoomState";
import { initData } from "./initData";

export class SpiritIslandRoom extends Room<SpiritIslandRoomS> {
  maxClients = 4;
  state = new SpiritIslandRoomS();

  onCreate(options: any) {
    const player = new PlayerSchema();
    player.name = "abc";

    this.state.players.set("abc", player);

    this.state.map.set("map_1_a", initData.clone());
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
