"use client";

import SearchAppBar from "@/components/app-bar"; // adjust path as needed
import { AppThemeProvider } from "./theme";
import { StoreProvider } from "@/services/store-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppThemeProvider>
          <StoreProvider>
            <SearchAppBar />
            {children}
          </StoreProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
