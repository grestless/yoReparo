import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#2563EB", // Blue-600
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#F3F4F6", // Gray-100
                    foreground: "#1F2937", // Gray-800
                },
                accent: {
                    DEFAULT: "#3B82F6", // Blue-500
                    foreground: "#FFFFFF",
                },
                background: "#FFFFFF",
                foreground: "#0F172A", // Slate-900
                muted: {
                    DEFAULT: "#F1F5F9", // Slate-100
                    foreground: "#64748B", // Slate-500
                },
                card: {
                    DEFAULT: "#FFFFFF",
                    foreground: "#0F172A",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [],
};
export default config;
