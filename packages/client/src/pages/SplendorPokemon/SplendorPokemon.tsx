import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useGameStore } from "../../store/useGameStore";
import { useUserStore } from "../../store/useUserStore";
import { loadAllImg } from "../../utils/loadAllImg";
import { SplendorPokemonClient } from "./SplendorPokemonClient";

export default function SplendorPokemon() {
  const { gamePlayInfo } = useGameStore();
  const { credentials } = useUserStore();
  const [isLoad, setIsLoad] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!gamePlayInfo) {
      navigate("/");
      return;
    }
  }, [gamePlayInfo, navigate]);

  useEffect(() => {
    loadAllImg().then(() => {
      setIsLoad(true);
    });
  }, []);

  return (
    <>
      {isLoad && gamePlayInfo && (
        <SplendorPokemonClient
          playerID={gamePlayInfo.playerID}
          matchID={gamePlayInfo.matchID}
          credentials={credentials}
        />
      )}
    </>
  );
}
