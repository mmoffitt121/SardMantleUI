export interface ConfigurableMenuItem {
    name: string;
    icon: string;
    route: string;
    expanded: boolean;
    options: ConfigurableMenuItem[];
}