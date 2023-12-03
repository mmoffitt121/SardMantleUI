import { DocumentType } from "../document/document-types/document-type";
import { Era } from "../units/calendar";

export interface TimelineItem {
    object: any;
    startDate: bigint;
    endDate: bigint | undefined;
    active: boolean;
    startDisplay: number;
    endDisplay: number;
    offScreenStart: boolean;
    offScreenEnd: boolean;
}

export interface TimelineRow {
    objectType: DocumentType | Era;
    items: TimelineItem[];
}
