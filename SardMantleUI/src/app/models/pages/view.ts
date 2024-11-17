
export interface View {
    id: string | undefined;
    name: string;
    description: string;
    viewType: string;
    searchCriteriaOptions: SearchCriteriaOptions | undefined;
    settings: any | undefined;
}

export interface SearchCriteriaOptions {
    criteria: DataPointSearchCriteria;
    userSortParameters: DataPointTypeParameter[] | undefined;
    userFilterParameters: DataPointTypeParameter[] | undefined;
}

export interface SearchBinCriteria {
    name: string;
    value: string;
    typeValue: string;
    parameters: number[];
    filterMode: number;
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
    searchBinCriteria?: SearchBinCriteria[] | undefined;
    orderByBin?: number;
    includeTypes: boolean | undefined;
    includeChildDataPoints: boolean | undefined;
    includeRelevantDataPoints: boolean | undefined;
    includeRelevantLocations: boolean | undefined;
    includeParameters: boolean | undefined;
    includeChildParameters: boolean | undefined;
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
    "Card",
    "List",
    "Map",
    "Timeline",
]

export const ViewTypeSettings = new Map([
    [
        "Card", 
        {
            querySettings: true,
            orderSettings: true,
            mapSettings: false,
        }
    ],
    [
        "List", 
        {
            querySettings: true,
            orderSettings: true,
            mapSettings: false,
        }
    ],
    [
        "Map", 
        {
            querySettings: false,
            orderSettings: false,
            mapSettings: true,
        }
    ],
    [
        "Timeline", 
        {
            querySettings: true,
            orderSettings: false,
            mapSettings: false,
        }
    ]
])