export interface MenuOption extends MenuGrouping {
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
