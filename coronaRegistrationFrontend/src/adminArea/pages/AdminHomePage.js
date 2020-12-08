import React from "react"
import { Box, Heading, Button, Clock, Text, } from "grommet"
import AnchorAppBar from "../../reuseComponents/AnchorAppBar"
import UserDataTable from "../components/UserDataTable"
import NextMatchdaysGrid from "../../reuseComponents/NextMatchdaysGrid"
import UserCheckIn from "../components/UserCheckIn"
import { Redirect } from "react-router-dom"

class AdminHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheckInVisible: false,
            a_visitorData: []
        }
        this.setCheckinVisible = this.setCheckinVisible.bind(this)
    }

    componentDidMount() {
        fetch("api/visitors",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": sessionStorage.getItem("s_authToken")
                }
            })
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    a_visitorData: result.data
                });
            });
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

    clearAuthToken() {
        sessionStorage.clear();
    }

    render() {
        const { isCheckInVisible, a_visitorData } = this.state;
        return (
            <>
                {sessionStorage.getItem("s_authToken") ? <> <AnchorAppBar b_isAdmin s_title="Mitarbeiterbereich" f_clearAuthToken={this.clearAuthToken.bind(this)} />
                    <Box direction="column" align="center" justify="center" pad="small" background="url(./footballbackground.jpg)">
                        <Heading level="2" textAlign="center" color="light-1">Nächstes Spiel :</Heading>
                        <Heading level="3" textAlign="center" color="light-1">Spvgg Lorbach gg. TSG Poppenhusen</Heading>
                        <Text> Zeit bis zum Anstoß </Text>
                        <Clock type="digital" run="backward" />
                        <Text> x Besucher Registriert </Text>
                        <Button primary label="Besucher einchecken" onClick={this.setCheckinVisible}></Button>
                    </Box>
                    {isCheckInVisible && <UserCheckIn f_closeLayer={this.closeCheckIn.bind(this)} />}
                    <NextMatchdaysGrid b_isAdmin />
                    <Box pad="medium">
                        <UserDataTable a_visitorData={a_visitorData} />
                    </Box></> : <Redirect to="/login" />}
            </>
        )
    }
}

export default AdminHomePage; 