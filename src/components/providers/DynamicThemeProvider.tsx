import { getSettings } from "@/actions/settings-actions";

export async function DynamicThemeProvider() {
    const settings = await getSettings();
    const theme = settings.theme || {
        fontDisplay: "Inter",
        fontBody: "Inter",
        colors: {
            light: {
                primary: "#137fec",
                background: "#f6f7f8",
                surface: "#ffffff",
                text: "#111418"
            },
            dark: {
                primary: "#137fec",
                background: "#101922",
                surface: "#1a2634",
                text: "#ffffff"
            }
        }
    };

    return (

        <style dangerouslySetInnerHTML={{
            __html: `
                :root {
                    --color-primary: ${theme.colors.light.primary};
                    --color-secondary: ${theme.colors.light.secondary || '#64748b'};
                    --color-background-light: ${theme.colors.light.background};
                    --color-surface-light: ${theme.colors.light.surface};
                    --color-text-main: ${theme.colors.light.text};
                    
                    --color-success: ${theme.colors.light.success || '#22c55e'};
                    --color-error: ${theme.colors.light.error || '#ef4444'};
                    --color-warning: ${theme.colors.light.warning || '#f59e0b'};
                    --color-info: ${theme.colors.light.info || '#3b82f6'};

                    --radius: ${theme.radius || '0.5rem'};
                    
                    --font-display: "${theme.fontDisplay}", sans-serif;
                    --font-body: "${theme.fontBody}", sans-serif;
                }

                .dark {
                    --color-primary: ${theme.colors.dark.primary};
                    --color-secondary: ${theme.colors.dark.secondary || '#94a3b8'};
                    --color-background-dark: ${theme.colors.dark.background};
                    --color-surface-dark: ${theme.colors.dark.surface};
                    --color-text-main: ${theme.colors.dark.text};

                    --color-success: ${theme.colors.dark.success || '#22c55e'};
                    --color-error: ${theme.colors.dark.error || '#ef4444'};
                    --color-warning: ${theme.colors.dark.warning || '#f59e0b'};
                    --color-info: ${theme.colors.dark.info || '#3b82f6'};
                }
            `
        }} />
    );
}
