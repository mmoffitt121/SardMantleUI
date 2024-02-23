export const themeFonts = [
    {id: "Arial", name: "Arial"}, 
    {id: "Comic Sans MS", name: "Comic Sans MS"},
    {id: "Courier New", name: "Courier New"},
    {id: "Georgia", name: "Georgia"},
    {id: "IM Fell English", name: "IM Fell English"},
    {id: "Impact", name: "Impact"}, 
    {id: "Tahoma", name: "Tahoma"}, 
    {id: "Times New Roman", name: "Times New Roman"}, 
    {id: "Trebuchet MS", name: "Trebuchet MS"}, 
    {id: "Verdana", name: "Verdana"}, 
]

export const themeMenuItems = [
    {
        name: "General",
        icon: "palette",
        children: [
            {
                name: "Theme Information",
                items: [
                    {
                        name: "Name",
                        description: "",
                        key: "name",
                        value: undefined,
                    },
                ]
            },
            {
                name: "Colors",
                items: [
                    {
                        name: "Primary UI Color",
                        description: "The primary color for cards, panels, and popups.",
                        key: "--lib-primary-color",
                        value: undefined,
                        type: "color",
                    },
                    {
                        name: "Primary UI Color Selected",
                        description: "The primary color for cards, panels, and popups when they've been selected.",
                        key: "--lib-primary-color-selected",
                        value: undefined,
                        type: "color",
                    },
                    {
                        name: "Background Color",
                        description: "",
                        key: "--lib-background-color",
                        value: undefined,
                        type: "color",
                    },
                    {
                        name: "Submit Color",
                        description: "",
                        key: "--lib-submit-accent-color",
                        value: undefined,
                        type: "color",
                    },
                    {
                        name: "Accent Color",
                        description: "",
                        key: "--lib-primary-accent-color",
                        value: undefined,
                        type: "color",
                    },
                    {
                        name: "Accent Color Selected",
                        description: "",
                        key: "--lib-primary-accent-color-selected",
                        value: undefined,
                        type: "color",
                    },
                    {
                        name: "Accent Color Disabled",
                        description: "",
                        key: "--lib-primary-accent-color-disabled",
                        value: undefined,
                        type: "color",
                    },
                    {
                        name: "Field Overlay Color",
                        description: "",
                        key: "--lib-field-overlay-color",
                        value: undefined,
                        type: "color",
                    },
                ]
            },
            {
                name: "Font",
                items: [
                    {
                        name: "Font",
                        key: "--lib-primary-font",
                        value: undefined,
                        type: "select",
                        options: themeFonts,
                    },
                    {
                        name: "Text Color",
                        key: "--lib-text-color",
                        value: undefined,
                        type: "color",
                    },
                    {
                        name: "Text Color Disabled",
                        key: "--lib-text-color-disabled",
                        value: undefined,
                        type: "color",
                    },
                    {
                        name: "Secondary Text Color",
                        key: "--lib-secondary-text-color",
                        value: undefined,
                        type: "color",
                    },
                    {
                        name: "Tertiary Text Color",
                        key: "--lib-tertiary-text-color",
                        value: undefined,
                        type: "color",
                    },
                ]
            },
        ]
    },
]

export const defaultTheme = {
    "name": "New Theme",
    "key": "",
    "--lib-background-color": "#302222",
    "--lib-primary-color": "#4f3b3b",
    "--lib-primary-color-selected": "#5a4c4b",
    "--lib-primary-font": "IM Fell English",
    "--lib-text-color": "#ffffff",
    "--lib-text-color-disabled": "#ffffff",
    "--lib-secondary-text-color": "#c8c8c8",
    "--lib-tertiary-text-color": "#a5a5a5",
    "--lib-submit-accent-color": "#ffeceb",
    "--lib-primary-accent-color": "#665352",
    "--lib-primary-accent-color-disabled": "#423434",
    "--lib-primary-accent-color-selected": "#735f59",
    "--lib-field-overlay-color": "#0e0807",
    "--lib-destructive-action-color": "#770000",
}