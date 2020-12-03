import React from "react"
import { Heading, Box } from "grommet"
import AnchorAppBar from "../../reuseComponents/AnchorAppBar"
import MatchdayOverview from "../../reuseComponents/MatchdayOverview"
import UserDataTable from "../components/UserDataTable"

class MatchdayManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            b_isAdmin: true,
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
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
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
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
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

    render() {
        const { b_isAdmin, o_matchData, a_visitorData } = this.state;
        return (
            <>
                <AnchorAppBar s_title="Spieltag Verwalten" b_isNotHome b_isAdmin />
                <Box pad="medium" direction="column" width="75%">
                    <MatchdayOverview b_isAdmin={b_isAdmin} s_opponent={o_matchData.opponent} s_dateTime={o_matchData.dateTime} i_maxSpaces={o_matchData.maxSpaces} />
                </Box>

                <Heading level="3" textAlign="start" color="black" margin="medium" > Besucherliste</Heading>

                <Box pad="medium" direction="column" width="100%">
                    <UserDataTable a_visitorData={a_visitorData} />
                </Box>


            </>
        )
    }
}

export default MatchdayManager; 