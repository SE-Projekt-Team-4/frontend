import React from "react"
import { Box, Heading, Button, Clock, Markdown, } from "grommet"
import AnchorAppBar from "../../reuseComponents/AnchorAppBar"
import UserDataTable from "../components/UserDataTable"
import NextMatchdaysGrid from "../../reuseComponents/NextMatchdaysGrid"
import UserCheckIn from "../components/UserCheckIn"
import { CenterLayer } from "../components/CenterLayer"

class AdminHomePage extends React.Component {
    render() {
        return(
            <>
                
                <AnchorAppBar s_title="Mitarbeiterbereich"/>
                <Box flex direction="column" align="center" alignContent="center" justify="center" background="url(./footballbackground.jpg)">
                <Heading level="2" textAlign="center" color="light-1">Nächstes Spiel :</Heading>
                <Heading level="3" textAlign="center" color="light-1">Spvgg Lorbach gg. TSG Poppenhusen</Heading>
                <Markdown> Zeit bis zum Anstoß </Markdown>
                <Clock type="digital"
                run="backward" />
                <Markdown> x Besucher Registriert </Markdown>
                    <Button secondary label="Besucher einchecken"></Button>
                </Box>
                <NextMatchdaysGrid b_isAdmin />
                <UserDataTable />
                
            </>
        )
    }
}

export default AdminHomePage; 