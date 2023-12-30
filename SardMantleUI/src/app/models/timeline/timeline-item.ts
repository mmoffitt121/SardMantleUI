import { DocumentType } from "../document/document-types/document-type";
import { Selectable } from "../selectable/selectable";
import { Era, EraDefinition } from "../units/calendar";

export interface TimelineItem extends Selectable {
    object: EraDefinition | undefined;
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
