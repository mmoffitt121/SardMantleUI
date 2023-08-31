import { Selectable } from "../selectable/selectable";

export interface Region extends Selectable {
    id: number | undefined;
    locationId: number;
    name: string;
    shape: string;
    showByDefault: boolean;
}