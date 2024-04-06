
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
}