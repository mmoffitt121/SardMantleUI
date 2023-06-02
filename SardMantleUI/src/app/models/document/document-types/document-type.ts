import { Selectable } from "../../selectable/selectable";

export interface DocumentType extends Selectable {
    id: number;
    name: string;
    summary: string;
    parameters: DocumentTypeParameter[];
}

export interface DocumentTypeParameter {
    id: number;
    name: string;
    summary: string;
    dataPointTypeId: number;
    typeValue: string;
    sequence: number;
}