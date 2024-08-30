export interface DataPointQueryResult {
    count: number;
    results: QueriedDataPoint[];
    types: any[];
}

export interface QueriedDataPoint {
    id: number | undefined;
    name: string;
    settings: string | undefined;
    typeId: number;
    typeName: string;
    typeSummary: string | undefined;
    typeSettings: string | undefined;
    parameters: QueriedDataPointParameter[];
}

export interface QueriedDataPointParameter {
    typeParameterId: number;
    typeParameterName: string;
    typeParameterSummary: string | undefined;
    typeParameterTypeValue: string;
    typeParameterSequence: number;
    dataPointTypeReferenceId: number;
    typeParameterSettings: string;
    value: any | undefined;
    valueData: any | undefined;
    values: any[] | undefined;
    valuesData: any[] | undefined;
    isMultiple: boolean;
}