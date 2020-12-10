import React from "react";
import { Box, Grid, Heading, Button } from "grommet";
import MatchdayCard from "./MatchdayCard";
import AddMatchdayCard from "../adminArea/components/AddMatchdayCard";

class NextMatchdaysGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isShowingAllMatches: false,
        };
        this.showAllMatches = this.showAllMatches.bind(this);
    }

    showAllMatches() {
        this.setState({
            ...this.state,
            isShowingAllMatches: true
        })
    }

    render() {
        const { isShowingAllMatches } = this.state;
        const { b_isAdmin, a_matchData, f_updateMatches } = this.props;
        const numberOfMatchCards = isShowingAllMatches ? a_matchData.length : 4
        const a_slicedMatchData = a_matchData.slice(0, numberOfMatchCards);
        return (
            <>
                <Box direction="column" align="center">
                    <Heading level="2" textAlign="center" margin={{ "bottom": "xsmall" }}>Nächsten Spieltage</Heading>
                </Box>
                <Grid gap="medium" justify="center" align="center" columns="medium" rows="small" pad="medium">
                    {b_isAdmin &&
                        <AddMatchdayCard f_updateMatchdays={f_updateMatches}/>
                    }
                    {a_slicedMatchData.map((o_match) => {
                        return (
                            <MatchdayCard b_isAdmin={b_isAdmin} key={o_match.id} i_matchId={o_match.id} s_opponent={o_match.opponent} s_dateTime={o_match.date} i_freeSpaces={o_match.freeSpaces} b_isCancelled={o_match.isCancelled} />
                        )
                    })}
                </Grid>
                <Box pad="medium" direction="column" align="center">
                    {!isShowingAllMatches && <Button secondary active label="Alle Spieltage Ansehen" onClick={this.showAllMatches}></Button>}
                </Box>
            </>
        )
    }
}

export default NextMatchdaysGrid; 