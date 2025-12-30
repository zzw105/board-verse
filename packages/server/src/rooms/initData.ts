import { MapS, RegionS } from "../schema/SpiritIslandRoomState";

const initData = new MapS();

const a = new RegionS();
a.key = "map_1_a_1";
a.regionNumber = 1;
a.adjacentRegionKeys.push("map_1_a_0");
export { initData };
