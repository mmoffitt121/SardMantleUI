export interface DocumentType {
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