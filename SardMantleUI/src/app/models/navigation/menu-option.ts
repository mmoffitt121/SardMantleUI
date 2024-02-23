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

export const MENU_GROUPINGS_EXPANDED = "MenuGroupingsExpanded";

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
                icon: "history_edu",
                isRoot: false,
                route: "document",
                roles: []
            },
            /*{
                name: "Timeline",
                icon: "timeline",
                isRoot: false,
                route: "timeline",
                roles: []
            },*/
        ]
    },
    {
        name: "World Setup",
        fillHook: "",
        expanded: false,
        options: [
            {
                name: "Document Types",
                icon: "receipt_long",
                isRoot: false,
                route: "document-type",
                roles: ["Editor", "Administrator"]
            },
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
                icon: "palette",
                isRoot: false,
                route: "theme",
                roles: ["Editor", "Administrator"]
            },
        ]
    },
    {
        name: "Global",
        fillHook: "",
        expanded: false,
        options: [
            {
                name: "Library Home",
                icon: "apartment",
                isRoot: true,
                route: "home",
                roles: []
            },
            {
                name: "User Settings",
                icon: "person",
                isRoot: true,
                route: "user-settings",
                roles: ["Viewer", "Editor", "Administrator"]
            },
            {
                name: "Administration",
                icon: "shield_person",
                isRoot: true,
                route: "administration",
                roles: ["Administrator"]
            },
        ]
    },
] as MenuGrouping[];