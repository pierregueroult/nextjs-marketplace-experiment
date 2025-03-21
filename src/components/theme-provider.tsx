"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ComponentProps } from "react";

type ThemeProviderProps = Readonly<ComponentProps<typeof NextThemesProvider>>;

export function ThemeProvider({ children, ...props}: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}