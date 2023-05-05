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