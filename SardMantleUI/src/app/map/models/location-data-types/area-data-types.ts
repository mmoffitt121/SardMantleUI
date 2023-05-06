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
}
export interface Area {
    id: number;
    name: string;
}
export interface Subregion {
    id: number;
    name: string;
}
export interface Region {
    id: number;
    name: string;
}
export interface Subcontinent {
    id: number;
    name: string;
}
export interface Continent {
    id: number;
    name: string;
}
export interface CelestialObject {
    id: number;
    name: string;
}