import { StatusBar } from "expo-status-bar"
import Navigation from "./src/components/Navigation"
import { ThemeProvider } from "./src/context/ThemeContext"

export default function App() {

  return (
    <ThemeProvider>
      <StatusBar style='auto' />
      <Navigation />
    </ThemeProvider>
  )
}

