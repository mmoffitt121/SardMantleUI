export interface Permission {
    id: string;
    description: string;
    children: any[];
}

export interface Role {
    id: string;
    permissions: string[];
}

export interface ViewableLibraryUser {
    id: string;
    userName: string;
    roles: string[];
    libraryRoles: Role[];
}