export class MapIconMaps {
    public static colorMap = new Map<number | null, string>([
        [null, "#FFFFFFFF"],
        [1, "#ffc919"], // City
        [2, "#b88932"], // Town
        [3, "#80562d"], // Village
        [4, "#543521"], // Hamlet
        [5, "#7f8182"], // Fortress
        [6, "#68cce8"], // River
        [7, "#00FF00"],
        [8, "#000000"],
        [9, "#FFFFFF"],
        [10, "#FFFFFF"],
        [11, "#FFFFFF"],
    ])
    public static radiusMap = new Map<number | null, number>([
        [null, 10],
        [1, 15], // City
        [2, 12], // Town
        [3, 9], // Village
        [4, 7], // Hamlet
        [5, 7], // Fortress
        [6, 7], // River
        [7, 7],
        [8, 7],
        [9, 7],
        [10, 7],
        [11, 7],
    ])
}
