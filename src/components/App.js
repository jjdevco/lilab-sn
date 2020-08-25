import React from "react";

//Preset Theme
import { ThemeProvider } from "emotion-theming";
import theme from "@rebass/preset";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <header>
          <h2>LLab</h2>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
