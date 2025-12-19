import { Client, Room } from "@colyseus/core";

import { Player, SpiritIslandRoomState } from "./schema/SpiritIslandRoomState";

export class SpiritIslandRoom extends Room<SpiritIslandRoomState> {
  maxClients = 4;
  state = new SpiritIslandRoomState();

  onCreate(options: any) {
    const player = new Player();
    player.name = "abc";

    this.state.players.set("abc", player);
    this.onMessage("m", (client, data) => {
      this.state.players.forEach((player) => {
        player.x = data.x;
        player.y = data.y;
      });
    });
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
