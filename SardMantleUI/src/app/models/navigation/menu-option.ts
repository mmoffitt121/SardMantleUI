export interface MenuOption {
    name: string;
    icon: string;
    isRoot: boolean;
    route: string;
    roles: string[];
}

export interface MenuGrouping {
    name: string;
    fillHook: string;
    expanded: boolean;
    options: MenuOption[];
}

export const navMenuOptions = [
    {
        name: "Navigation",
        fillHook: "",
        expanded: true,
        options: [
            {
                name: "Home",
                icon: "home",
                isRoot: false,
                route: "home",
                roles: []
            },
            {
                name: "Map",
                icon: "map",
                isRoot: false,
                route: "map",
                roles: []
            },
            {
                name: "Document",
                icon: "description",
                isRoot: false,
                route: "document",
                roles: []
            },
            {
                name: "Timeline",
                icon: "timeline",
                isRoot: false,
                route: "timeline",
                roles: []
            },
        ]
    },
    {
        name: "World Setup",
        fillHook: "",
        expanded: true,
        options: [
            {
                name: "Units",
                icon: "design_services",
                isRoot: false,
                route: "units",
                roles: []
            },
            {
                name: "Calendars",
                icon: "calendar_month",
                isRoot: false,
                route: "calendar",
                roles: []
            },
            {
                name: "Themes",
                icon: "brush",
                isRoot: false,
                route: "theme",
                roles: ["Editor", "Administrator"]
            },
        ]
    },
    {
        name: "Community",
        fillHook: "",
        expanded: true,
        options: [
            {
                name: "Library Home",
                icon: "apartment",
                isRoot: true,
                route: "home",
                roles: []
            },
            {
                name: "World Browser",
                icon: "travel_explore",
                isRoot: true,
                route: "world-browser",
                roles: []
            },
        ]
    },
    {
        name: "Settings",
        fillHook: "",
        expanded: true,
        options: [
            {
                name: "World Manager",
                icon: "public",
                isRoot: true,
                route: "world-manager",
                roles: ["Editor", "Administrator"]
            },
            {
                name: "User Settings",
                icon: "person",
                isRoot: true,
                route: "user-settings",
                roles: ["Viewer", "Editor", "Administrator"]
            },
        ]
    },
    {
        name: "Administration",
        fillHook: "",
        expanded: true,
        options: [
            {
                name: "Administration",
                icon: "shield_person",
                isRoot: true,
                route: "administration",
                roles: ["Administrator"]
            },
        ]
    }
] as MenuGrouping[];