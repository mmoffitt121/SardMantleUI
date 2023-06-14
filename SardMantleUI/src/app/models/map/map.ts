import { SafeUrl } from "@angular/platform-browser";
import { Selectable } from "../selectable/selectable";

export interface Map extends Selectable {
    id: number;
    name: string;
    summary: string;
    loops: boolean;
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
    url: SafeUrl | null;
}