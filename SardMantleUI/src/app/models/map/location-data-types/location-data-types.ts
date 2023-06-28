import { Selectable } from "../../selectable/selectable";

export class LocationDataTypes {
    public static dataTypeMap = new Map<number | null, string>([
        [null, ""],
        [0, "Location"],
        [1, "Area"], 
        [2, "Subregion"],
        [3, "Region"],
        [4, "Subcontinent"],
        [5, "Continent"],
        [6, "Celestial Object"],
        [7, "Celestial System"],
        [8, "Manifold"]
    ])
}

export interface Location {
    id: number;
    name: string;
    locationTypeId: number;
    zoomProminenceMin: number;
    zoomProminenceMax: number;
    latitude: number;
    longitude: number;
    parentId: number;
    layerId: number;
    iconURL: string | undefined;
}

export interface LocationType extends Selectable {
    id: number;
    name: string;
    summary: string;
    parentTypeId: number | undefined;
    anyTypeParent: boolean;
    zoomProminenceMin: number;
    zoomProminenceMax: number;
    iconURL: string | undefined;
    usesIcon: boolean;
    usesLabel: boolean;
}