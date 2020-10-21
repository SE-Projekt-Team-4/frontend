import React from "react";
import { Grommet, Box, Grid, Heading, Button } from "grommet"; 
import MatchdayCard from "./components/MatchdayCard"

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

const AppBar = (props) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: "1" }}
    {...props}
  />
); 

const App = () => {
  return (
    <Grommet theme={theme} full>
      <Box fill>
        <AppBar>
          <Heading level="3" margin="none">Homepage</Heading>
        </AppBar>
          <Box flex direction="column" align="center" alignContent="center" justify="center" background="url(./resources/footballbackground.jpg)">
            <Heading level="3" textAlign="center">Wilkommen bei der Terminbuchung der [Vereinsname]</Heading>
            <Button primary label="Unser Hygenekonzept Einsehen"></Button>
          </Box>
          <Box pad="large">
            <Heading level="2" textAlign="center">Nächsten Spieltage</Heading>
          <Grid gap="medium" rows="small" columns={{ count: "fit", size: "small" }}>
            <MatchdayCard/>
            <MatchdayCard/>
          </Grid>
          </Box>
          <Button secondary label="Alle Spieltage Ansehen"></Button>
        </Box>
    </Grommet>
  );
}

export default App;
