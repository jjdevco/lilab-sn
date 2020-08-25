import React from "react";

// Router components
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Preset Theme
import { ThemeProvider } from "emotion-theming";
import theme from "@rebass/preset";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={Login} path="/login" exact />
          <Route component={Register} path="/register" exact />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
