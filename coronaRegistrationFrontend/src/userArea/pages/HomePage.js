import React from "react"
import { Box, Grid, Heading, Button } from "grommet";
import MatchdayCard from "../../reuseComponents/MatchdayCard"
import AnchorAppBar from "../../reuseComponents/AnchorAppBar";

class HomePage extends React.Component {
    render() {
        return(
            <Box fill>
                <AnchorAppBar>
                    <Heading level="3" margin="none">Homepage</Heading>
                </AnchorAppBar>
                <Box flex direction="column" align="center" alignContent="center" justify="center" background="url(../../resources/footballbackground.jpg)">
                    <Heading level="3" textAlign="center">Wilkommen bei der Terminbuchung der [Vereinsname]</Heading>
                    <Button primary label="Unser Hygenekonzept Einsehen"></Button>
                </Box>
                <Box pad="large">
                    <Heading level="2" textAlign="center">Nächsten Spieltage</Heading>
                    <Grid gap="medium" rows="small" columns={{ count: "fit", size: "small" }}>
                        <MatchdayCard />
                        <MatchdayCard />
                    </Grid>
                </Box>
                <Button secondary label="Alle Spieltage Ansehen"></Button>
            </Box>
        )
    }
}

export default HomePage; 