export const showHide = [
    {id: "true", name: "Show"}, 
    {id: "false", name: "Hide"},
]

export const searchableViewMenuItems = [
    {
        name: "Search",
        icon: "search",
        children: [
            {
                name: "General",
                items: [
                    {
                        name: "Gradient Type",
                        key: "showFilterOptions",
                        value: undefined,
                        type: "select",
                        options: showHide,
                    },
                ]
            },
        ]
    }
]


export const defaultViewSettings = {
    "showFilterOptions": "true",
}