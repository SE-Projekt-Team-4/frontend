import React from "react"
import HomePage from "./userArea/pages/HomePage"
import AdminHomePage from "./adminArea/pages/AdminHomePage"
import { Grommet } from "grommet"
import { Route, Switch } from 'react-router-dom'
import BookingPage from "./userArea/pages/BookingPage"
import MatchdayManager from "./adminArea/pages/MatchdayManager"
import AdminLogIn from "./adminArea/pages/AdminLogIn"
import { PrivateRoute } from "./util/PrivateRoute"

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
  const s_authToken = sessionStorage.getItem("s_authToken")
  return (
    <Grommet theme={theme} full>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <PrivateRoute exact path="/admin" isLoggedIn={s_authToken} component={AdminHomePage} />
        <Route exact path="/booking/:id" component={BookingPage} />
        <PrivateRoute exact path="/admin/editMatch/:id" isLoggedIn={s_authToken} component={MatchdayManager}/>
        <Route exact path="/login" component={AdminLogIn}/>
      </Switch>
    </Grommet>
  )
}
