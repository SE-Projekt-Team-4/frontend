import React from "react"
import HomePage from "./pages/HomePage"
import { Grommet } from "grommet"
import { Route, Switch } from 'react-router-dom'

/**
 * Define the global theme for the app
 */
const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

export default function App() {
  return (
    <Grommet theme={theme}>
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
    </Grommet> 
  )
}
