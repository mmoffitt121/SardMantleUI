export interface Permission {
    id: string;
    description: string;
    children: any[];
    read: boolean | undefined;
    write: boolean | undefined;
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