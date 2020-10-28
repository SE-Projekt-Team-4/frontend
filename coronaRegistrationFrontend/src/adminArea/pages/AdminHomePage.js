import React from "react"
import { Box, Grid, Heading, Button } from "grommet"
import MatchdayCard from "../../reuseComponents/MatchdayCard"
import AppBar from "../../reuseComponents/AnchorAppBar"

class AdminHomePage extends React.Component {
    render() {
        return(
            <Box fill>
                <AppBar>
                    <Heading level="3" margin="none">Mitarbeiterbereich</Heading>
                </AppBar>
                <Box flex direction="column" align="center" alignContent="center" justify="center" background="url(../resources/footballbackground.jpg)">
                    Main content
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

export default AdminHomePage; 