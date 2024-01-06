import { Selectable } from "../selectable/selectable";
import { DateTimeObject } from "../timeline/time";

export interface Calendar extends Selectable {
    id: number;
    name: string;
    summary: string;
    unitTimePerDay: number;
    months: Month[];
    timeUnits: TimeUnit[];
    eras: Era[];
    timeZones: TimeZone[];
    formatters: Formatter[];
    weekdays: Weekday[];
}

export interface Month {
    name: string;
    summary: string;
    days: number;
    sequence: number;
}

export interface TimeUnit {
    id: number;
    derivedFromId: number;
    amountPerDerived: number;
    startTimeUnit: number;
    formatter: string;
    name: string;
    summary: string;
} 

export interface Era extends TimeUnit {
    eraDefinitions: EraDefinition[];
    defined: boolean;
}

export interface EraDefinition {
    name: string;
    summary: string;
    start: string;
    end: string;
    backwards: boolean;
    eraNumber: number;
}

export interface TimeZone {
    id: number;
    name: string;
    summary: string;
    offset: number;
    derivedTimeUnitId: number;
}

export interface Formatter {
    id: number;
    name: string;
    summary: string;
    formatter: string;
}

export interface Weekday {
    sequence: number;
    name: string;
    summary: string;
    formatter: string;
}

export interface Week {
    number: bigint;
    days: DateTimeObject[];
}
