import { Selectable } from "../../selectable/selectable";

export interface Document extends Selectable {
    id: number | undefined;
    name: string;
    summary: string;
    parameters: any[];
    typeId: number;
}