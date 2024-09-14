// -=-=-=-=-=-=-=-
// Menu Options
// -=-=-=-=-=-=-=-

// Generic

export const showHide = [
    {id: "true", name: "Show"}, 
    {id: "false", name: "Hide"},
]

export const showHideDefault = [
    {id: "true", name: "Show by Default"}, 
    {id: "false", name: "Hide by Default"},
]

// Card Options

export const cardBorderRadius = [
    {id: "0px", name: "Rectangle"}, 
    {id: "5px", name: "Slightly Rounded"},
    {id: "10px", name: "Rounded"},
    {id: "25px", name: "Very Rounded"},
    {id: "40px", name: "Extremely Rounded"},
]

export const cardParameterColumnsOptions = [
    {id: 'parameter-grid', name: "Auto"},
    {id: 'parameter-grid-1', name: "1 Column"},
    {id: 'parameter-grid-2', name: "2 Columns"},
    {id: 'parameter-grid-3', name: "3 Columns"},
    {id: 'parameter-grid-4', name: "4 Columns"},
]

export const cardArticleDisplay = [
    {id: "clickableIcon", name: "Show Inside Clickable Icon"},
    {id: "atBottom", name: "Show at Bottom of Card"},
]

export const sidePanelStyles = [
    {id: "sidebar-full", name: "Attached to Top and Bottom"},
    {id: "sidebar-card", name: "Card"},
]

// -=-=-=-=-=-=-=-
// Menu Items
// -=-=-=-=-=-=-=-

export const searchableViewMenuItems = [
    {
        name: "General",
        icon: "settings",
        children: [
            {
                name: "Interface",
                items: [
                    {
                        name: "Add Document Button",
                        key: "showAddDocumentButton",
                        value: undefined,
                        type: "select",
                        options: showHide,
                    },
                    {
                        name: "Search Button",
                        key: "showFilterOptions",
                        value: undefined,
                        type: "select",
                        options: showHide,
                    },
                    {
                        name: "Search Panel",
                        key: "showSearchByDefault",
                        value: undefined,
                        type: "select",
                        options: showHideDefault,
                    },
                    {
                        name: "Search Panel Style",
                        key: "sidebarStyle",
                        value: undefined,
                        type: "select",
                        options: sidePanelStyles,
                    },
                ]
            },
        ]
    }
]

// Card View

export const cardMenuItems = [
    {
        name: "Cards",
        icon: "view_agenda",
        children: [
            {
                name: "Appearance",
                items: [
                    {
                        name: "Card Shape",
                        key: "cardBorderRadius",
                        value: undefined,
                        type: "select",
                        options: cardBorderRadius,
                    },
                    {
                        name: "Expand Button",
                        key: "showExpandButton",
                        value: undefined,
                        type: "select",
                        options: showHide,
                    },
                    {
                        name: "Parameter Columns",
                        key: "cardParameterColumns",
                        value: undefined,
                        type: "select",
                        options: cardParameterColumnsOptions,
                    },
                    {
                        name: "Article Display",
                        key: "cardArticleDisplay",
                        value: undefined,
                        type: "select",
                        options: cardArticleDisplay,
                    },
                ]
            },
        ]
    }
]

// List View

export const listMenuItems = [

]

// -=-=-=-=-=-=-
// Defaults
// -=-=-=-=-=-=-

// Generic

export const defaultViewSettings = {
    "showFilterOptions": "true",
    "showSearchByDefault": "false",
    "showAddDocumentButton": "true",
    "sidebarStyle": "sidebar-full",
}

// Card View

export const defaultCardViewSettings = {
    "cardBorderRadius": "5px",
    "showExpandButton": "true",
    "cardParameterColumns": "parameter-grid",
    "cardArticleDisplay": "clickableIcon",
}

// List View

export const defaultListViewSettings = {
}
