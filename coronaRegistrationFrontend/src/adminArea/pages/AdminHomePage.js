import React from "react"
import { Box, Heading, Button, Clock, Markdown, } from "grommet"
import AnchorAppBar from "../../reuseComponents/AnchorAppBar"
import UserDataTable from "../components/UserDataTable"
import NextMatchdaysGrid from "../../reuseComponents/NextMatchdaysGrid"
import UserCheckIn from "../components/UserCheckIn"

class AdminHomePage extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            isCheckInVisible: false
        }
        this.setCheckinVisible = this.setCheckinVisible.bind(this)
    }

    setCheckinVisible() {
        this.setState({
            isCheckInVisible: true
        });
    }

    closeCheckIn() {
        this.setState({
            isCheckInVisible: false
        })
    }

    render() {
        const {isCheckInVisible} = this.state; 
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
                    <Button label="Besucher einchecken" onClick={this.setCheckinVisible}></Button>
                </Box>
                {isCheckInVisible && <UserCheckIn closeLayer={this.closeCheckIn.bind(this)}/>}
                <NextMatchdaysGrid b_isAdmin />
                <UserDataTable />
                
            </>
        )
    }
}

export default AdminHomePage; 