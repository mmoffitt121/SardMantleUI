import { Selectable } from "../../selectable/selectable";

export interface Document extends Selectable {
    id: number;
    name: string;
    summary: string;
    parameters: any[];
    typeId: number;
}