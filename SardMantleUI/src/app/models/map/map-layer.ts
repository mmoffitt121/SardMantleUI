import { Selectable } from "../selectable/selectable";

export interface MapLayer extends Selectable {
    id: number;
    name: string;
    summary: string;
    mapId: number;
    isBaseLayer: boolean;
    isIconLayer: boolean;
    iconURL: string;
}