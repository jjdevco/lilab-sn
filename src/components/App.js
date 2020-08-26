import React, { useContext, useReducer } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Context, Reducer } from "../state";

import { ThemeProvider } from "emotion-theming";
import theme from "@rebass/preset";
import { Flex } from "rebass";
import NavBar from "./NavBar";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

function App() {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Router>
      <Context.Provider value={{ state, dispatch }}>
        <ThemeProvider theme={theme}>
          <NavBar />

          <Flex
            sx={{
              minHeight: "calc(100vh - 54px)",
              backgroundColor: "#f5f9f7",
              marginTop: "54px",
            }}
          >
            <Switch>
              <Route component={Home} path={["/", "/tag/:tag"]} exact />
              <Route component={Login} path="/login" exact />
              <Route component={Register} path="/register" exact />
            </Switch>
          </Flex>
        </ThemeProvider>
      </Context.Provider>
    </Router>
  );
}

export default App;
