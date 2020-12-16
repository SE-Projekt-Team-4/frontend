import React from "react";
import { Box, Heading, Button, Clock, Text, Image } from "grommet";
import AnchorAppBar from "../../reuseComponents/AnchorAppBar";
import UserDataTable from "../components/UserDataTable";
import NextMatchdaysGrid from "../../reuseComponents/NextMatchdaysGrid";
import UserCheckIn from "../components/UserCheckIn";
import { Redirect } from "react-router-dom";
import { getNextMatch, getAllMatches, getBookings } from "../../util/ApiRequests";
/**
 * @class AdminHomePage
 * @version 5.2.0
 */
class AdminHomePage extends React.Component {
    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            a_bookingData: [],
            o_nextMatchData: {},
            i_registeredVisitors: 0,
            a_matchData: []
        }
        this.setCheckinVisible = this.setCheckinVisible.bind(this);
        this.closeCheckin = this.closeCheckin.bind(this);
        this.getMatches = this.getMatches.bind(this);
    }
    /**
     * Fills a_bookingdata and triggers the functions for getting the next match and all matches
     */
    componentDidMount() {
        getBookings().then(a_bookings => {
            this.setState({
                ...this.state,
                a_bookingData: a_bookings.data
            })
        });
        this.getNextMatch();
        this.getMatches();
    }

    /**
     * Fetches data for all matches from api
     */
    getMatches() {
        getAllMatches().then(a_matches => {
            this.setState({
                ...this.state,
                a_matchData: a_matches.data
            });
        });
        this.getNextMatch();
    }
    /**
     * Fetches data for the nex match from api
     */
    getNextMatch() {
        getNextMatch().then(o_match => {
            if (o_match.error && o_match.error.status === 404) {
                return;
            }
            this.setState({
                ...this.state,
                o_nextMatchData: o_match.data,
                i_registeredVisitors: o_match.data.maxSpaces - o_match.data.freeSpaces
            });
        });
    }
    /**
    * shows the checkin Layer including the scan function
    */
    setCheckinVisible() {
        this.setState({
            ...this.state,
            b_isCheckinVisible: true
        });
    }
    /**
    * hides the checkin Layer including the scan function
    */
    closeCheckin() {
        this.setState({
            ...this.state,
            b_isCheckinVisible: false
        });
    }

    /**
     * clears the authentification token from the session storage
     */
    clearAuthToken() {
        sessionStorage.clear();
    }

    /**
     * renders the admin home page
     */
    render() {
        const { b_isCheckinVisible, a_bookingData, o_nextMatchData, i_registeredVisitors, a_matchData } = this.state;
        const i_timeToNextMatchInMS = new Date(o_nextMatchData.date) - Date.now();
        let o_timeToNextMatchISO = "";
        if (!isNaN(i_timeToNextMatchInMS)) {
            o_timeToNextMatchISO = new Date(i_timeToNextMatchInMS).toISOString();
        }
        return (
            <>
                {sessionStorage.getItem("s_authToken") ? <> <AnchorAppBar b_isAdmin s_title="Mitarbeiterbereich" f_clearAuthToken={this.clearAuthToken.bind(this)} />
                    <Box direction="column" align="center" justify="center" gap="medium" pad="small" background="url(./footballbackground.jpg)">
                        <Image src="./teamlogo.png" fill={false} />
                        <Heading level="2" textAlign="center" margin="none" color="light-1">Nächstes Spiel:</Heading>
                        <Heading level="3" textAlign="center" margin="none" color="light-1">FG 08 Mutterstadt gg. {(o_nextMatchData.opponent && !o_nextMatchData.isCancelled) ? o_nextMatchData.opponent : "Ausstehend"}</Heading>
                        {(i_timeToNextMatchInMS <= 7200000 /*2 stunden in ms*/ && o_timeToNextMatchISO !== "" && !o_nextMatchData.isCancelled) ?
                            <Box gap="small" align="center" justify="center">
                                <Text color="light-1"> Zeit bis zum Anstoß: </Text>
                                <Clock color="light-1" type="digital" run="backward" time={o_timeToNextMatchISO} size="large" />
                                <Text color="light-1">{i_registeredVisitors} Buchungen </Text>
                                <Button primary label="Besucher registrieren" onClick={this.setCheckinVisible}></Button>
                            </Box> : <Text color="light-1">Die Funktion "Besucher registrieren" wird erst ab 2 Stunden vor Anstoß freigeschaltet</Text>}
                    </Box>
                    {b_isCheckinVisible && <UserCheckIn f_closeLayer={this.closeCheckin} />}
                    <NextMatchdaysGrid b_isAdmin a_matchData={a_matchData} f_updateMatches={this.getMatches} />
                    <Box pad="medium">
                        <UserDataTable a_visitorData={a_bookingData} b_isAdminPage />
                    </Box></> : <Redirect to="/login" />}
            </>
        )
    }
}

export default AdminHomePage; 