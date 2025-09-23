import { useEffect, useState } from "react";
import { useGameStore } from "../../store/useGameStore";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { loadAllImg } from "../../utils/loadAllImg";
import { TheCastlesOfBurgundyClient } from "./TheCastlesOfBurgundyClient";

export default function Splendor() {
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
        <TheCastlesOfBurgundyClient
          playerID={gamePlayInfo.playerID}
          matchID={gamePlayInfo.matchID}
          credentials={credentials}
        />
      )}
    </>
  );
}
