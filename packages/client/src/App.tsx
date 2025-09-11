import { Client } from "boardgame.io/react";
import { splendorBoard } from "./board";
import { SocketIO } from "boardgame.io/multiplayer";
import { splendorGame } from "@game/shared";
import { useState } from "react";
import { Input } from "antd";

// 只创建一次
const TicTacToeClient = Client({
  game: splendorGame,
  board: splendorBoard,
  multiplayer: SocketIO({ server: import.meta.env.VITE_API_URL }),
  numPlayers: 4
});

const App = () => {
  const [playerID, setPlayerID] = useState("");


  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setPlayerID(e.target.value)
  }
  return (
    <div>
      <Input
        placeholder="输入玩家ID"
        value={playerID}
        onChange={inputChange}
        style={{ width: 200, marginBottom: 16 }}
      />
      {playerID && <TicTacToeClient playerID={playerID} />}
    </div>
  );
};

export default App;
