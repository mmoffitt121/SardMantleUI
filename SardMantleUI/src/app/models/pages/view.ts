
export interface View {
    id: string | undefined;
    name: string;
    description: string;
    viewType: string;
    searchCriteriaOptions: SearchCriteriaOptions | undefined;
}

export interface SearchCriteriaOptions {
    criteria: DataPointSearchCriteria;
}

export interface DataPointSearchCriteria {
    typeId: number | undefined;
    typeIds: number[] | undefined;
    parameters: DataPointParameter[] | undefined;
    parameterReturnOptions: ParameterReturnOptions[] | undefined;
    parameterSearchOptions: ParameterSearchOptions[] | undefined;
}

export interface DataPointParameter {
    dataPointId: number;
    dataPointTypeParameterId: number;
}

export interface ParameterReturnOptions {
    typeParameterId: number;
    shouldReturn: boolean;
}

export interface ParameterSearchOptions {
    dataPointTypeParameterId: number;
    filterMode: number;
    sequenceId: number;
}

export const ViewTypes = [
    "List",
    "Card"
]