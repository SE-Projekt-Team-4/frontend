import React from "react"
import { Heading, Box } from "grommet"
import AnchorAppBar from "../../reuseComponents/AnchorAppBar"
import MatchdayOverview from "../../reuseComponents/MatchdayOverview"
import UserDataTable from "../components/UserDataTable"
import MatchdayManagementForm from "../../reuseComponents/MatchdayManagementForm"

class MatchdayManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            b_isAdmin: true,
            b_hasOpenedEditMatchday: false,
            o_matchData: {},
            a_visitorData: []
        }
    }

    componentDidMount() {
        const s_apiUrl = "/api/matches/" + this.props.match.params.id;
        fetch(s_apiUrl,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }).then(res => res.json())
            .then((result) => {
                this.setState({
                    ...this.state,
                    o_matchData: result.data,
                });
            }).catch((error) => {
                this.setState({
                    ...this.state,
                    error
                });
            });
        fetch(s_apiUrl + "/visitors",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Basic " //user:password base64 encode 
                }
            })
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    a_visitorData: result.data
                });
            },
                (error) => {
                    this.setState({
                        ...this.state,
                        error
                    })
                });
    }

    toggleEditMatchday() {
        const { b_hasOpenedEditMatchday } = this.state;
        if(b_hasOpenedEditMatchday) {
            this.setState({
                ...this.state,
                b_hasOpenedEditMatchday: false
            });
        } else if(!b_hasOpenedEditMatchday) {
            this.setState({
                ...this.state,
                b_hasOpenedEditMatchday: true
            });
        }
       
    }

    render() {
        const { b_isAdmin, o_matchData, a_visitorData, b_hasOpenedEditMatchday } = this.state;
        const s_formattedDate = new Date(o_matchData.date);
        const s_time = s_formattedDate.toTimeString().substring(0, 5); 
        const s_date = s_formattedDate.getDate() + "." + (s_formattedDate.getMonth()+1) + "." + s_formattedDate.getFullYear(); 
        return (
            <>
                <AnchorAppBar s_title="Spieltag Verwalten" b_isNotHome b_isAdmin />
                <Box pad="medium" direction="column" width="75%">
                    <MatchdayOverview b_isAdmin={b_isAdmin} s_opponent={o_matchData.opponent} s_dateTime={o_matchData.date} i_maxSpaces={o_matchData.maxSpaces} i_freeSpaces={o_matchData.freeSpaces} f_openEditMatchday={this.toggleEditMatchday.bind(this)}/>
                </Box>
                {b_hasOpenedEditMatchday && 
                <MatchdayManagementForm s_title="Spieltag Editieren" s_opponent={o_matchData.opponent} s_dateTime={o_matchData.date} s_date={s_date} s_time={s_time} i_maxSpaces={o_matchData.maxSpaces} b_isCancelled={o_matchData.isCancelled} f_closeLayer={this.toggleEditMatchday.bind(this)}/>}
                <Heading level="3" textAlign="start" color="black" margin="medium" > Besucherliste</Heading>

                <Box pad="medium" direction="column" width="100%">
                    <UserDataTable a_visitorData={a_visitorData} />
                </Box>


            </>
        )
    }
}

export default MatchdayManager; 