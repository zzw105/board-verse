import { Client } from 'boardgame.io/react';
import { TicTacToe } from './game';
import { TicTacToeBoard } from './board';
import { Local } from 'boardgame.io/multiplayer';

const TicTacToeClient = Client({ game: TicTacToe, board: TicTacToeBoard, multiplayer: Local(), });

const App = () => (
  <div>
    <TicTacToeClient playerID="0" />
    <TicTacToeClient playerID="1" />
  </div>
);

export default App;