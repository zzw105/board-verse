import { useEffect } from "react";
import { SplendorClient, useBoardgameStore } from "../../store/useBoardgameStore";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "../../store/useUserStore";

export default function Splendor() {
  const boardgameStore = useBoardgameStore();
  const userStore = useUserStore();
  const splendorPlayInfo = boardgameStore.splendorPlayInfo;

  const navigate = useNavigate();

  useEffect(() => {
    if (!boardgameStore.splendorPlayInfo) {
      navigate("/");
      return;
    }
  }, [boardgameStore.splendorPlayInfo, navigate]);

  return (
    <>
      {splendorPlayInfo && (
        <SplendorClient
          playerID={splendorPlayInfo.playerID}
          matchID={splendorPlayInfo.matchID}
          credentials={userStore.credentials}
        />
      )}
    </>
  );
}
