import React from "react"
import { Heading, Box } from "grommet"
import AnchorAppBar from "../../reuseComponents/AnchorAppBar"
import MatchdayOverview from "../../reuseComponents/MatchdayOverview"
import UserDataTable from "../components/UserDataTable"
import MatchdayManagementForm from "../../reuseComponents/MatchdayManagementForm"
import { Redirect } from "react-router-dom"
import { getMatchById, getBookingsByMatchId, deleteExistingMatch } from "../../util/ApiRequests"
import DeleteMatchdayLayer from "../components/DeleteMatchdayLayer"
/**
 * @class MatchdayManager
 * @version 4.4.1
 */
class MatchdayManager extends React.Component {
/**
 * 
 * @param {*} props 
 */
    constructor(props) {
        super(props);
        this.state = {
            b_isAdmin: true,
            b_hasOpenedEditMatchday: false,
            b_hasDeletedMatchday: false,
            o_matchData: {},
            a_visitorData: []
        }
        this.getMatchData = this.getMatchData.bind(this);
        this.deleteMatchday = this.deleteMatchday.bind(this); 
    }
/**
 * Fetches booking data for the matchday
 */
    componentDidMount() {
        this.getMatchData();
        getBookingsByMatchId(this.props.match.params.id).then(a_bookings => {
            this.setState({
                ...this.state,
                a_visitorData: a_bookings.data
            });
        });
    }
/**
 * Fetches match data for the matchday
 */
    getMatchData() {
        getMatchById(this.props.match.params.id).then(o_match => {
            this.setState({
                ...this.state,
                o_matchData: o_match.data
            });
        });
    }
/**
 * deletes the selected matchday
 */
    deleteMatchday() {
        deleteExistingMatch(this.props.match.params.id); 
        window.location.replace("/admin"); 
    }
/**
 * opens/closes the editing window for the selected matchday
 */
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
/**
 * opens/closes the delete window for the selected matchday
 */
    toggleDeleteMatchday() {
        const { b_hasDeletedMatchday } = this.state;
        if (b_hasDeletedMatchday) {
            this.setState({
                ...this.state,
                b_hasDeletedMatchday: false
            });
        } else if (!b_hasDeletedMatchday) {
            this.setState({
                ...this.state,
                b_hasDeletedMatchday: true
            });
        }
    }
/**
 * clears the authentification token from the session storage
 */
    clearAuthToken() {
        sessionStorage.clear();
    }
/**
 * Renders the matchday management page for a selected matchday
 */
    render() {
        const { b_isAdmin, o_matchData, a_visitorData, b_hasOpenedEditMatchday, b_hasDeletedMatchday } = this.state;
        return (
            <>
                {sessionStorage.getItem("s_authToken") ? <><AnchorAppBar b_isNotHome b_isAdmin s_title="Spieltag Verwalten" f_clearAuthToken={this.clearAuthToken.bind(this)} />
                    <Box pad="medium" direction="column" width="75%">
                        <MatchdayOverview b_isAdmin={b_isAdmin} s_opponent={o_matchData.opponent} s_dateTime={o_matchData.date} i_maxSpaces={o_matchData.maxSpaces} i_freeSpaces={o_matchData.freeSpaces} f_openEditMatchday={this.toggleEditMatchday.bind(this)} f_deleteMatchday={this.toggleDeleteMatchday.bind(this)} />
                    </Box>
                    {b_hasOpenedEditMatchday &&
                        <MatchdayManagementForm b_isEditingExistingMatchday i_matchId={this.props.match.params.id} f_passMatchdayDataToParent={this.getMatchData} s_title="Spieltag Editieren" s_opponent={o_matchData.opponent} s_dateTime={o_matchData.date} i_maxSpaces={o_matchData.maxSpaces} b_isCancelled={o_matchData.isCancelled} f_closeLayer={this.toggleEditMatchday.bind(this)} />}
                    {b_hasDeletedMatchday &&
                        <DeleteMatchdayLayer f_onCloseLayer={this.toggleDeleteMatchday.bind(this)} f_onDeleteMatchday={this.deleteMatchday}/>
                    }
                    <Heading level="3" textAlign="start" color="black" margin="medium" > Besucherliste</Heading>

                    <Box pad="medium" direction="column" width="100%">
                        <UserDataTable a_visitorData={a_visitorData} b_isAdminPage={false}/>
                    </Box> </> : <Redirect to="/login" />
                }
            </>
        )
    }
}

export default MatchdayManager; 