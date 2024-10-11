import { Selectable } from "../../selectable/selectable";

export interface DocumentType extends Selectable {
    id: number;
    name: string;
    summary: string;
    typeParameters: DocumentTypeParameter[];
}

export interface DocumentTypeParameter extends Selectable {
    id: number | null;
    name: string;
    summary: string;
    dataPointTypeId: number;
    typeValue: string;
    subType: string | undefined;
    sequence: number;
    dataPointTypeReferenceId: number | null;
    settings: any | undefined;
    isMultiple: boolean | undefined;
}