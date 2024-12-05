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

// Timeline Options

export const timelineViewTypes = [
    {id: "0px", name: "Rectangle"}, 
    {id: "5px", name: "Slightly Rounded"},
    {id: "10px", name: "Rounded"},
    {id: "25px", name: "Very Rounded"},
    {id: "40px", name: "Extremely Rounded"},
]

// Selection Options

export const selectionBehaviors = [
    {id: "none", name: "None"},
    {id: "select", name: "Open upon Selection"},
]

export const behaviorsBeforeSelection = [
    {id: "alwaysDisplay", name: "Always Display"},
    {id: "onlySelected", name: "Only Display When Selected"},
]

export const locationPanelSelectedBehaviors = [
    {id: "close", name: "Open the Location Panel"},
    {id: "open", name: "Don't Open the Location Panel"},
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

// Timeline View

export const timelineMenuItems = [
    {
        name: "Timeline Settings",
        icon: "timeline",
        children: [
            {
                name: "Appearance",
                items: [
                    {
                        name: "Orientation",
                        key: "timelineOrientation",
                        value: undefined,
                        type: "select",
                        options: [
                            {id: "h", name: "Horizontal"},
                            {id: "v", name: "Vertical"},
                        ],
                    },
                    {
                        name: "Item Display",
                        key: "timelineDataPointDisplay",
                        value: undefined,
                        type: "select",
                        options: [
                            {id: "name", name: "Name and Date"},
                            {id: "full", name: "Full"},
                        ],
                    },
                ]
            },
        ]
    }
]

// Map View

export const mapMenuItems = [
    {
        name: "Map Settings",
        icon: "map",
        children: [
            {
                name: "Buttons",
                items: [
                    {
                        name: "Map Menu Button",
                        key: "showMapMenu",
                        value: undefined,
                        type: "select",
                        options: showHide
                    },
                    {
                        name: "Add Location Button",
                        key: "showAddLocation",
                        value: undefined,
                        type: "select",
                        options: showHide
                    },
                ]
            },
            {
                name: "Selection",
                items: [
                    {
                        name: "Add Location Button",
                        key: "selectionBehavior",
                        value: undefined,
                        type: "select",
                        options: selectionBehaviors
                    },
                    {
                        name: "Behavior Before Selection",
                        key: "behaviorBeforeSelection",
                        value: undefined,
                        type: "select",
                        options: behaviorsBeforeSelection
                    },
                    {
                        name: "Location Panel Behavior Upon Selection",
                        key: "locationPanelSelectedBehavior",
                        value: undefined,
                        type: "select",
                        options: locationPanelSelectedBehaviors
                    },
                ]
            },
        ]
    }
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

// Timeline

export const defaultTimelineViewSettings = {
    "timelineOrientation": "h",
    "timelineDataPointDisplay": "name"
}

// Map

export const defaultMapViewSettings = {
    "selectionBehavior": "none",
    "behaviorBeforeSelection": "alwaysDisplay",
    "locationPanelSelectedBehavior": "close",
    "showMapMenu": "true",
    "showAddLocation": "true",
}