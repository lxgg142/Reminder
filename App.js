import { StatusBar } from "expo-status-bar";
import React from "react";
import Navigation from "./src/components/Navigation";
import { LanguageProvider } from "./src/context/Language";
import { TaskProvider } from "./src/context/TaskContext";
import { ThemeProvider } from "./src/context/ThemeContext";

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <TaskProvider>
          <StatusBar style="auto" />
          <Navigation />
        </TaskProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
