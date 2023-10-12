export interface UnitTable {
    measurable: Measurable;
    units: Unit[];
}

export interface Unit {
    id: number;
    name: string;
    summary: string;
    measurableId: number;
    parentId: number;
    amountPerParent: number;
    symbol: string;

    baseUnit: Unit | undefined;
}

export interface Measurable {
    id: number;
    name: string;
    summary: string;
    unitType: number;
}