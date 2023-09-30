export interface UnitTable {
    measurable: Measurable;
    units: Unit[];
}

export interface Unit {
    id: number;
    name: string;
    summary: string;
    parentId: number;
    amountPerParent: number;
}

export interface Measurable {
    id: number;
    name: string;
    summary: string;
    unitType: number;
}