import React from "react"
import { Box, Grid, Heading, Button, Clock, Markdown, } from "grommet"
import MatchdayCard from "../../reuseComponents/MatchdayCard"
import AnchorAppBar from "../../reuseComponents/AnchorAppBar"
import UserDataTable from "../components/UserDataTable"

class AdminHomePage extends React.Component {
    render() {
        return(
            <>
                <AnchorAppBar title="Mitarbeiterbereich"/>
                <Box flex direction="column" align="center" alignContent="center" justify="center" background="url(./footballbackground.jpg)">
                <Heading level="2" textAlign="center" color="light-1">Nächstes Spiel :</Heading>
                <Heading level="3" textAlign="center" color="light-1">Spvgg Lorbach gg. TSG Poppenhusen</Heading>
                <Markdown> Zeit bis zum Anstoß </Markdown>
                <Clock type="digital"
                run="backward" />
                <Markdown> x Besucher Registriert </Markdown>
                    <Button secondary label="Besucher einchecken"></Button>
                </Box>
                <Box pad="large">
                    <Heading level="2" textAlign="center">Nächsten Spieltage</Heading>
                    <Grid gap="medium" rows="small" columns={{ count: "fit", size: "small" }}>
                        <MatchdayCard />
                        <MatchdayCard />
                    </Grid>
                </Box>
                <Button secondary label="Alle Spieltage Ansehen"></Button>

                <UserDataTable />
            </>
        )
    }
}

export default AdminHomePage; 