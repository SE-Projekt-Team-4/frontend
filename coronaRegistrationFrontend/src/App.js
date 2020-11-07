import React from "react"
import HomePage from "./userArea/pages/HomePage"
import AdminHomePage from "./adminArea/pages/AdminHomePage"
import { Grommet } from "grommet"
import { Route, Switch } from 'react-router-dom'
import BookingPage from "./userArea/pages/BookingPage"

/**
 * Define the global theme for the app
 */
const theme = {
  global: {
    colors: {
      brand: "#000000"
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    }
  },
};

export default function App() {
  return (
    <Grommet theme={theme} full>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/admin" component={AdminHomePage} />
        <Route exact path="/booking" component={BookingPage} />
      </Switch>
    </Grommet>
  )
}
