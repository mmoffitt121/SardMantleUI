import { Selectable } from "../selectable/selectable";

export interface Map extends Selectable {
    id: number;
    name: string;
    areaZoomProminence: number;
    subregionZoomProminence: number;
    regionZoomProminence: number;
    subcontinentZoomProminence: number;
    continentZoomProminence: number;
    defaultZ: number;
    defaultX: number;
    defaultY: number;
    minZoom: number;
    maxZoom: number;
    isDefault: boolean;
}