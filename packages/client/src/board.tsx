import type { BoardProps } from 'boardgame.io/dist/types/packages/react';
import { type CSSProperties, type JSX } from 'react';

export function splendorBoard(data: BoardProps) {


  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
}