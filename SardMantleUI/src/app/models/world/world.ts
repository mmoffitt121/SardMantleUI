import { SafeUrl } from "@angular/platform-browser";
import { Selectable } from "../selectable/selectable";

export interface World extends Selectable {
    id: number;
    ownerId: string;
    location: string;
    name: string;
    summary: string;
    createdDate: Date;
    iconUrl: SafeUrl | null;
}