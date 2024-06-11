export interface Page {
    id: string;
    name: string;
    description: string;
    path: string;
    root: PageElement;
}

export interface PageElement {
    objectType: number;
    objectSettings: any;
    children: PageElement[];
}

export interface PageCriteria {
    ids: string[] | undefined;
    includePageData: boolean | undefined;
    orderBy: string | undefined;
    descending: boolean | undefined;
    pageNumber: number | undefined;
    pageSize: number | undefined;
}