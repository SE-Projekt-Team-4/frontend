import React from "react";
import { Grommet, Box, Heading } from "grommet";

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};
const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
  />
);

const App = () => {
  return (
    <Grommet theme={theme}>
      <Box fill>
        <AppBar>
          <Heading level="3" margin="none">Mitarbeiterbereich</Heading>
        </AppBar>
        <Box flex direction="row" overflow={{ horizontal: "hidden" }}>
          <Box flex align="center" justify="center">
            app body
          </Box>
        </Box>
      </Box>
    </Grommet>
  );
}

export default App;
