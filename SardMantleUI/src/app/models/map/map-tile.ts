import { SafeUrl } from "@angular/platform-browser";
import { Selectable } from "../selectable/selectable";

export interface MapTile extends Selectable {
    z: number;
    x: number;
    y: number;
    layerId: number;
    safeURL: SafeUrl | undefined;
}