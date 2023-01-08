import { StatusBar } from "expo-status-bar";
import React from "react";

import { LanguageProvider } from "./src/context/language";
import { SettingsProvider } from "./src/context/settings";
import { TaskProvider } from "./src/context/task";
import { ThemeProvider } from "./src/context/theme";
import Navigation from "./src/Navigation";

export default function App() {
  return (
    <SettingsProvider>
      <LanguageProvider>
        <ThemeProvider>
          <TaskProvider>
            <StatusBar style="auto" />
            <Navigation />
          </TaskProvider>
        </ThemeProvider>
      </LanguageProvider>
    </SettingsProvider>
  );
}
