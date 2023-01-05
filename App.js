import { StatusBar } from "expo-status-bar";
import React from "react";
import Navigation from "./src/components/Navigation";
import { LanguageProvider } from "./src/context/language";
import { TaskProvider } from "./src/context/TaskContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import { SettingsProvider } from "./src/context/settings";

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
