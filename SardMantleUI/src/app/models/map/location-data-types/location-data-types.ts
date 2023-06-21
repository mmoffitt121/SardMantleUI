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
    locationName: string;
    latitude: number;
    longitude: number;
    areaId: number;
    area: string;
}

export interface LocationType {
    id: number;
    name: string;
    summary: string;
    parentTypeId: number;
    anyTypeParent: boolean;
    zoomProminence: number;
}