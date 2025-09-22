import styles from "./Home.module.less";
import { useUserStore } from "../../store/useUserStore";
import { Button, message, Space, Table, Tag, type TableProps } from "antd";
import SetUserInfoModal, { type SetUserInfoModalType } from "../../components/SetUserInfoModal/SetUserInfoModal";
import { useEffect, useState, type JSX } from "react";
import CreateRoomModal, { type CreateRoomModalType } from "../../components/CreateRoomModal/CreateRoomModal";
import { lobbyClient, useBoardgameStore } from "../../store/useBoardgameStore";
import { GameTypeEnum, type GameTypeKeyType } from "../../enum/game";
import type { LobbyAPI } from "boardgame.io";
import { useNavigate } from "react-router-dom";
import { UserEnumName } from "../../enum/user";

export type roomType = LobbyAPI.Match;

export default function Home() {
  const userStore = useUserStore();
  const navigate = useNavigate();
  const name = userStore.name;
  const setCredentials = useUserStore((state) => state.setCredentials);
  const [setUserInfoModalIsOpen, setSetUserInfoModalIsOpen] = useState(false);
  const [createRoomModalIsOpen, setCreateRoomModalIsOpen] = useState(false);
  const setSetUserInfoModalOnSubmit: SetUserInfoModalType["onSubmit"] = (values) => {
    useUserStore.setState({
      name: values.name,
    });
    setSetUserInfoModalIsOpen(false);
  };
  const createRoomOnSubmit: CreateRoomModalType["onSubmit"] = (values) => {
    console.log(values);
    lobbyClient
      .createMatch(values.gameType, {
        numPlayers: values.numPlayers,
        setupData: {
          roomName: values.roomName,
        },
      })
      .then((res) => {
        if (res.matchID) {
          updateRoomList(nowGameType);
          setCreateRoomModalIsOpen(false);
        }
      });
  };

  const boardgameStore = useBoardgameStore();
  const [nowGameType, setNowGameType] = useState<GameTypeKeyType>("splendorMonorepo");
  const updateRoomList = (nowGameType: GameTypeKeyType) => {
    lobbyClient.listMatches(nowGameType).then((res) => {
      console.log(res.matches);
      setRomeList(res.matches);
    });
  };
  useEffect(() => {
    if (nowGameType) {
      updateRoomList(nowGameType);
    }

    const i = setInterval(() => {
      if (nowGameType) {
        updateRoomList(nowGameType);
      }
    }, 2000);
    return () => {
      clearInterval(i);
    };
  }, [nowGameType]);

  const [romeList, setRomeList] = useState<roomType[]>([]);
  const columns: TableProps<roomType>["columns"] = [
    {
      title: "房间名称",
      dataIndex: ["setupData", "roomName"],
    },
    {
      title: "游戏",
      dataIndex: "gameName",
      render: (text: GameTypeKeyType) => <span>{GameTypeEnum[text]}</span>,
    },
    {
      title: "玩家",
      dataIndex: "players",
      render: (_, record) => (
        <>
          {record.players.map((player, index) => {
            const color = player.name ? "geekblue" : "green";
            const name = player.name ? player.name : "空";
            return (
              <Tag color={color} key={record.matchID + index}>
                {name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => {
        const JsxList: JSX.Element[] = [];
        const isFull = record.players.every((item) => item.name);
        const isMe = record.players.find((player) => player.name === name);

        if (isFull) {
          if (isMe) {
            JsxList.push(
              <a key={record.matchID + "leave"} onClick={() => leaveRoom(record)}>
                退出
              </a>
            );
            JsxList.push(
              <a key={record.matchID + "startGame"} onClick={() => startGame(record)}>
                开始游戏
              </a>
            );
          }
        } else {
          if (isMe) {
            JsxList.push(
              <a key={record.matchID + "leave"} onClick={() => leaveRoom(record)}>
                退出
              </a>
            );
          } else {
            JsxList.push(
              <a key={record.matchID + "join"} onClick={() => joinRoom(record)}>
                加入
              </a>
            );
          }
        }

        return <Space size="middle">{JsxList}</Space>;
      },
    },
  ];

  const joinRoom = (record: roomType) => {
    if (userStore.credentials) {
      message.error("请先退出当前房间");
      return;
    }
    lobbyClient.joinMatch(record.gameName, record.matchID, { playerName: name }).then((res) => {
      console.log(res);
      updateRoomList(nowGameType);
      userStore.setCredentials(res.playerCredentials);
    });
  };
  const leaveRoom = (record: roomType) => {
    const playerID = record.players.find((item) => item.name === name)?.id;
    if (playerID !== undefined && userStore.credentials) {
      lobbyClient
        .leaveMatch(record.gameName, record.matchID, {
          playerID: `${playerID}`,
          credentials: userStore.credentials,
        })
        .then(() => {
          updateRoomList(nowGameType);
          userStore.setCredentials(undefined);
        });
    } else console.error(playerID, userStore.credentials);
  };
  const startGame = (record: roomType) => {
    const playerID = record.players.find((item) => item.name === name)?.id;
    if (playerID !== undefined) {
      boardgameStore.setSplendorPlayInfo({
        matchID: record.matchID,
        playerID: `${playerID}`,
      });
      navigate("/splendor");
    } else {
      message.error("请先加入房间");
    }
  };

  return (
    <>
      <div className={styles.home}>
        <div className={styles.header}>
          <div className={styles.user}>欢迎，{name}</div>
          <div className={styles["btn-list"]}>
            <Button size="large" onClick={() => setCredentials(undefined)}>
              重置用户
            </Button>
            <Button size="large" onClick={() => setSetUserInfoModalIsOpen(true)}>
              修改个人信息
            </Button>
            <Button size="large" onClick={() => setCreateRoomModalIsOpen(true)}>
              创建房间
            </Button>
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles["game-type-list"]}>
            {boardgameStore.gameList.map((item) => (
              <div
                className={`${styles["game-type-item"]} ${nowGameType === item.value ? styles.active : ""}`}
                key={item.value}
                onClick={() => setNowGameType(item.value)}
              >
                {item.label}
              </div>
            ))}
          </div>
          <div className={styles.center}>
            <div className={styles.title}>{GameTypeEnum[nowGameType]}</div>
            <div className={styles["room-table"]}>
              {name === UserEnumName.Visitor ? (
                <div style={{ margin: "20px 20px " }}>请先修改个人信息</div>
              ) : (
                <Table<roomType> rowKey="matchID" columns={columns} dataSource={romeList} />
              )}
            </div>
          </div>
        </div>
      </div>
      <SetUserInfoModal
        isModalOpen={setUserInfoModalIsOpen}
        setIsModalOpen={setSetUserInfoModalIsOpen}
        onSubmit={setSetUserInfoModalOnSubmit}
      />
      <CreateRoomModal
        isModalOpen={createRoomModalIsOpen}
        setIsModalOpen={setCreateRoomModalIsOpen}
        onSubmit={createRoomOnSubmit}
      />
    </>
  );
}
