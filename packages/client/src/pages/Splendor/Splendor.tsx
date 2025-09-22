import { useEffect, useState } from "react";
import { SplendorClient, useBoardgameStore } from "../../store/useBoardgameStore";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { loadAllImg } from "../../utils/loadAllImg";

export default function Splendor() {
  const { splendorPlayInfo } = useBoardgameStore();
  const { credentials } = useUserStore();
  const [isLoad, setIsLoad] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!splendorPlayInfo) {
      navigate("/");
      return;
    }
  }, [splendorPlayInfo, navigate]);

  useEffect(() => {
    loadAllImg().then(() => {
      setIsLoad(true);
    });
  }, []);

  return (
    <>
      {isLoad && splendorPlayInfo && (
        <SplendorClient
          playerID={splendorPlayInfo.playerID}
          matchID={splendorPlayInfo.matchID}
          credentials={credentials}
        />
      )}
    </>
  );
}
