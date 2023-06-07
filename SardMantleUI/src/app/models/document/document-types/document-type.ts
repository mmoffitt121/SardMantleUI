import { Selectable } from "../../selectable/selectable";

export interface DocumentType extends Selectable {
    id: number;
    name: string;
    summary: string;
    typeParameters: DocumentTypeParameter[];
}

export interface DocumentTypeParameter extends Selectable {
    id: number;
    name: string;
    summary: string;
    dataPointTypeId: number;
    typeValue: string;
    sequence: number;
}