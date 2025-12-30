import { MapS, RegionItemTypeE, RegionS } from "../schema/SpiritIslandRoomState";

const initData = new MapS();

const a = new RegionS();
a.key = "map_1_a_1";
a.regionNumber = 1;
a.regionType = RegionItemTypeE.ocean;

export { initData };
