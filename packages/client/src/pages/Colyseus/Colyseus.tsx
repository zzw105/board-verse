import { useEffect, useRef, useState } from "react";
import { Client, Room } from "colyseus.js";
import { MyState } from "../../../../server/src/rooms/schema/MyRoomState";

const client = new Client("http://localhost:2567");
export default function Colyseus() {
  const roomRef = useRef<Room>();

  const [isConnecting, setIsConnecting] = useState(true);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const req = client.joinOrCreate<MyState>("tictactoe", {});

    req.then((room) => {
      roomRef.current = room;

      setIsConnecting(false);

      // handle room events here
      room.onStateChange((state) => {
        console.log(state);
        setPlayers(state.players.toJSON());
      });
    });

    return () => {
      // make sure to leave the room when the component is unmounted
      req.then((room) => room.leave());
    };
  }, []);

  return <div>{JSON.stringify(players)}</div>;
}
