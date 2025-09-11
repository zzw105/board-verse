import { Client, Lobby } from "boardgame.io/react";
import { splendorBoard } from "./board";
import { SocketIO } from "boardgame.io/multiplayer";
import { splendorGame } from "@game/shared";
import { useState } from "react";
import { Button, Input } from "antd";
import CreateRoom, { type CreateRoomType } from "./components/CreateRoom";
import { LobbyClient } from 'boardgame.io/client';
import { RouterProvider } from "react-router-dom";
import router from "./router";

// 只创建一次
const TicTacToeClient = Client({
  game: splendorGame,
  board: splendorBoard,
  multiplayer: SocketIO({ server: import.meta.env.VITE_API_URL }),
  numPlayers: 4
});


const lobbyClient = new LobbyClient({
  server: import.meta.env.VITE_API_URL
});

const App = () => {
  lobbyClient.listGames()
    .then(games => console.log('可用游戏:', games));
  // const [playerID, setPlayerID] = useState("");
  // const [isModalOpen, setIsModalOpen] = useState(false);


  // const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.value)
  //   setPlayerID(e.target.value)
  // }

  // const onSubmit: CreateRoomType['onSubmit'] = async (values) => {
  //   const res = await fetch(`${import.meta.env.VITE_API_URL}/create`, {
  //     method: 'POST',
  //     body: JSON.stringify(values)
  //   })
  // }
  return (
    <div>
      {/* <Button type="primary" onClick={() => setIsModalOpen(true)}>创建/加入 房间</Button>
      <CreateRoom isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onSubmit={onSubmit}></CreateRoom> */}
      {/* <Input
        
        placeholder="输入玩家ID"
        value={playerID}
        onChange={inputChange}
        style={{ width: 200, marginBottom: 16 }}
      />
      {playerID && <TicTacToeClient playerID={playerID} />} */}
      {/* <Lobby
        gameServer={import.meta.env.VITE_API_URL}
        lobbyServer={import.meta.env.VITE_API_URL}
        gameComponents={[
          { game: splendorGame, board: splendorBoard }
        ]}
      />; */}

      <div className="app">
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
