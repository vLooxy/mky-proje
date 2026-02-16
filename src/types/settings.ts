export interface LinkItem {
    id?: string;
    label: string;
    href: string;
    subItems?: LinkItem[];
}

export interface FooterColumn {
    title: string;
    links: LinkItem[];
}

export interface Settings {
    site?: {
        title?: string;
        description?: string;
        copyright?: string;
    };
    contact?: {
        address?: string;
        phone?: string;
        email?: string;
    };
    social?: {
        [key: string]: string;
    };
    header?: {
        navItems?: LinkItem[];
    };
    footer?: {
        columns?: FooterColumn[];
    };
    theme?: ThemeSettings;
}

export interface ThemeColors {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    success: string;
    error: string;
    warning: string;
    info: string;
}

export interface ThemeSettings {
    fontDisplay: string;
    fontBody: string;
    radius: string;
    colors: {
        light: ThemeColors;
        dark: ThemeColors;
    };
}
