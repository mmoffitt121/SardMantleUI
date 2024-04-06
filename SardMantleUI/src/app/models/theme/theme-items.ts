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

export const themeOutlineTypes = [
    {id: "none", name: "None"},
    {id: "dotted", name: "Dotted"},
    {id: "dashed", name: "Dashed"},
    {id: "solid", name: "Solid"},
    {id: "double", name: "Double"},
    {id: "groove", name: "Groove"},
    {id: "ridge", name: "Ridge"},
    {id: "inset", name: "Inset"},
    {id: "outset", name: "Outset"},
]

export const themeLinearGradientDirections = [
    {id: "to top", name: "Top"},
    {id: "to bottom", name: "Bottom"},
    {id: "to right", name: "Right"},
    {id: "to left", name: "Left"},
    {id: "to top right", name: "Top Right"},
    {id: "to top left", name: "Top Left"},
    {id: "to bottom right", name: "Bottom Right"},
    {id: "to bottom left", name: "Bottom Left"},
]

export const themeGradientType = [
    {id: "", name: "None"}, 
    {id: "linear-gradient", name: "Linear"},
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
                    {
                        name: "Submit Text Color",
                        key: "--lib-submit-text-accent-color",
                        value: undefined,
                        type: "color",
                    },
                ]
            },
            {
                name: "Outline",
                items: [
                    {
                        name: "Style",
                        key: "--lib-primary-outline-style",
                        value: undefined,
                        type: "select",
                        options: themeOutlineTypes,
                    },
                    {
                        name: "Color",
                        key: "--lib-primary-outline-color",
                        value: undefined,
                        type: "color",
                    },
                    {
                        name: "Width",
                        key: "--lib-primary-outline-width",
                        value: undefined,
                    },
                ]
            },
        ]
    },
    {
        name: "Background",
        icon: "wallpaper",
        children: [
            {
                name: "Background",
                items: [
                    {
                        name: "Background Color",
                        description: "",
                        key: "--lib-background-color",
                        value: undefined,
                        type: "color",
                    },
                ]
            },
            {
                name: "Background Gradient",
                items: [
                    {
                        name: "Gradient Type",
                        key: "--lib-background-gradient-type",
                        value: undefined,
                        type: "select",
                        options: themeGradientType,
                    },
                    {
                        name: "Gradient Direction",
                        key: "--lib-background-gradient-direction",
                        value: undefined,
                        type: "select",
                        options: themeLinearGradientDirections,
                    },
                    {
                        name: "Gradient Color",
                        description: "The color to fade to in the gradient.",
                        key: "--lib-background-gradient-color",
                        value: undefined,
                        type: "color",
                    },
                ]
            },
            {
                name: "Sidebar",
                items: [
                    {
                        name: "Background Color",
                        description: "",
                        key: "--lib-sidebar-color",
                        value: undefined,
                        type: "color",
                    },
                ]
            },
            {
                name: "Sidebar Gradient",
                items: [
                    {
                        name: "Gradient Type",
                        key: "--lib-sidebar-gradient-type",
                        value: undefined,
                        type: "select",
                        options: themeGradientType,
                    },
                    {
                        name: "Gradient Direction",
                        key: "--lib-sidebar-gradient-direction",
                        value: undefined,
                        type: "select",
                        options: themeLinearGradientDirections,
                    },
                    {
                        name: "Gradient Color",
                        description: "The color to fade to in the gradient.",
                        key: "--lib-sidebar-gradient-color",
                        value: undefined,
                        type: "color",
                    },
                ]
            },
        ],
    },
]

export const defaultTheme = {
    "name": "New Theme",
    "key": "",
    "--lib-primary-color": "#4f3b3b",
    "--lib-primary-color-selected": "#5a4c4b",
    "--lib-primary-font": "IM Fell English",
    "--lib-text-color": "#ffffff",
    "--lib-text-color-disabled": "#ffffff",
    "--lib-secondary-text-color": "#c8c8c8",
    "--lib-tertiary-text-color": "#a5a5a5",
    "--lib-submit-accent-color": "#ffeceb",
    "--lib-submit-text-accent-color": "#111111",
    "--lib-primary-accent-color": "#665352",
    "--lib-primary-accent-color-disabled": "#423434",
    "--lib-primary-accent-color-selected": "#735f59",
    "--lib-field-overlay-color": "#0e0807",
    "--lib-destructive-action-color": "#770000",
    "--lib-primary-outline-style": "",
    "--lib-primary-outline-color": "",
    "--lib-primary-outline-width": "1",

    "--lib-background-gradient": "none",
    "--lib-background-color": "#302222",
    "--lib-background-gradient-type": "",
    "--lib-background-gradient-direction": "to bottom",
    "--lib-background-gradient-color": "#5a4c4b",
    "--lib-sidebar-gradient": "none",
    "--lib-sidebar-color": "#302222",
    "--lib-sidebar-gradient-type": "",
    "--lib-sidebar-gradient-direction": "to bottom",
    "--lib-sidebar-gradient-color": "#5a4c4b",
}