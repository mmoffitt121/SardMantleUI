import { EraDefinition } from "../units/calendar";

export interface DateTimeObject {
    time: number[];
    weekday: number;
    day: number;
    month: number;
    year: bigint;
    eraYear: bigint;
    era: (EraDefinition | undefined)[];
}