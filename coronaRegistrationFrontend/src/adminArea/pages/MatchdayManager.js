import React from "react"
import { Heading, Box } from "grommet"
import AnchorAppBar from "../../reuseComponents/AnchorAppBar"
import MatchdayOverview from "../../reuseComponents/MatchdayOverview"
import UserDataTable from "../components/UserDataTable"
import MatchdayManagementForm from "../../reuseComponents/MatchdayManagementForm"
import { Redirect } from "react-router-dom"
import { getMatchById, getBookingsByMatchId } from "../../util/ApiRequests"

class MatchdayManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            b_isAdmin: true,
            b_hasOpenedEditMatchday: false,
            o_matchData: {},
            a_visitorData: []
        }
        this.getMatchData = this.getMatchData.bind(this); 
    }

    componentDidMount() {
        this.getMatchData();
        getBookingsByMatchId(this.props.match.params.id).then(a_bookings => {
            this.setState({
                ...this.state,
                a_visitorData: a_bookings.data
            });
        });
    }

    getMatchData() {
        getMatchById(this.props.match.params.id).then(o_match => {
            this.setState({
                ...this.state,
                o_matchData: o_match.data
            });
        });
    }

    toggleEditMatchday() {
        const { b_hasOpenedEditMatchday } = this.state;
        if (b_hasOpenedEditMatchday) {
            this.setState({
                ...this.state,
                b_hasOpenedEditMatchday: false
            });
        } else if (!b_hasOpenedEditMatchday) {
            this.setState({
                ...this.state,
                b_hasOpenedEditMatchday: true
            });
        }
    }

    clearAuthToken() {
        sessionStorage.clear();
    }

    render() {
        const { b_isAdmin, o_matchData, a_visitorData, b_hasOpenedEditMatchday } = this.state;
        const s_formattedDate = new Date(o_matchData.date);
        const s_time = s_formattedDate.toTimeString().substring(0, 5);
        const s_date = s_formattedDate.getDate() + "." + (s_formattedDate.getMonth() + 1) + "." + s_formattedDate.getFullYear();
        return (
            <>
                {sessionStorage.getItem("s_authToken") ? <><AnchorAppBar b_isNotHome b_isAdmin s_title="Spieltag Verwalten" f_clearAuthToken={this.clearAuthToken.bind(this)} />
                    <Box pad="medium" direction="column" width="75%">
                        <MatchdayOverview b_isAdmin={b_isAdmin} s_opponent={o_matchData.opponent} s_dateTime={o_matchData.date} i_maxSpaces={o_matchData.maxSpaces} i_freeSpaces={o_matchData.freeSpaces} f_openEditMatchday={this.toggleEditMatchday.bind(this)} />
                    </Box>
                    {b_hasOpenedEditMatchday &&
                        <MatchdayManagementForm b_isEditingExistingMatchday i_matchId={this.props.match.params.id} f_passMatchdayDataToParent={this.getMatchData} s_title="Spieltag Editieren" s_opponent={o_matchData.opponent} s_dateTime={o_matchData.date} i_maxSpaces={o_matchData.maxSpaces} b_isCancelled={o_matchData.isCancelled} f_closeLayer={this.toggleEditMatchday.bind(this)} />}
                    <Heading level="3" textAlign="start" color="black" margin="medium" > Besucherliste</Heading>

                    <Box pad="medium" direction="column" width="100%">
                        <UserDataTable a_visitorData={a_visitorData} />
                    </Box> </> : <Redirect to="/login" />
                }
            </>
        )
    }
}

export default MatchdayManager; 