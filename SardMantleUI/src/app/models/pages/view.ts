
export interface View {
    id: string | undefined;
    name: string;
    description: string;
    viewType: string;
    searchCriteriaOptions: SearchCriteriaOptions | undefined;
}

export interface SearchCriteriaOptions {
    criteria: DataPointSearchCriteria;
    userSortParameters: DataPointTypeParameter[] | undefined;
}

export interface DataPointSearchCriteria {
    id: number;
    stringId: string;
    query: string;
    orderBy: string;
    descending: boolean;
    pageNumber: number;
    pageSize: number;
    typeId: number | undefined;
    typeIds: number[] | undefined;
    parameters: DataPointParameter[] | undefined;
    parameterReturnOptions: ParameterReturnOptions[] | undefined;
    parameterSearchOptions: ParameterSearchOptions[] | undefined;
    orderByTypeParam: DataPointTypeParameter | undefined;
    orderByTypeParamDesc: boolean | undefined;
    includeTypes: boolean | undefined;
}

export interface DataPointTypeParameter {
    id: number;
    name: string;
    summary: string;
    dataPointTypeId: number;
    typeValue: string;
    sequence: number;
    dataPointTypeReferenceId: number;
    settings: string;
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