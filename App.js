import { StatusBar } from "expo-status-bar";
import Navigation from "./src/components/Navigation";
import { TaskProvider } from "./src/context/TaskContext";
import { ThemeProvider } from "./src/context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <StatusBar style="auto" />
        <Navigation />
      </TaskProvider>
    </ThemeProvider>
  );
}
