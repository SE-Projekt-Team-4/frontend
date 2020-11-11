import React from "react";
import { Box, Grid, Heading, Button } from "grommet";
import MatchdayCard from "./MatchdayCard";
import AddMatchdayCard from "../adminArea/components/AddMatchdayCard";

class NextMatchdaysGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            matchData: [],
            error: null,
            isShowingAllMatches: false,
        };

        this.showAllMatches = this.showAllMatches.bind(this); 
    }

    componentDidMount() {
        fetch("/api/matches",
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
                    matchData: result.data
                });
            },
                (error) => {
                    this.setState({
                        ...this.state,
                        error
                    })
                }
            )
    }

    showAllMatches() {
        this.setState({
            ...this.state,
            isShowingAllMatches: true
        })
    }

    render() {
        const { matchData, error, isShowingAllMatches } = this.state;
        const { b_isAdmin } = this.props;
        const numberOfMatchCards = isShowingAllMatches ? matchData.length : 4
        const a_slicedMatchData = matchData.slice(0, numberOfMatchCards);
        return (
            <>
                <Box direction="column" align="center">
                    <Heading level="2" textAlign="center" margin={{ "bottom": "xsmall" }}>Nächsten Spieltage</Heading>
                </Box>
                <Grid gap="medium" justify="center" align="center" columns="medium" rows="small" pad="medium">
                    {b_isAdmin &&
                        <AddMatchdayCard />
                    }
                    {a_slicedMatchData.map((match) => {
                        return (
                            <MatchdayCard b_isAdmin={b_isAdmin} key={match.id} i_matchId={match.id} s_opponent={match.opponent} s_dateTime={match.dateTime} i_maxSpaces={match.maxSpaces} b_isCancelled={match.isCancelled} />
                        )
                    })}
                </Grid>
                <Box pad="medium" direction="column" align="center">
                    {!isShowingAllMatches &&
                    <Button secondary active label="Alle Spieltage Ansehen" onClick={this.showAllMatches}></Button>
                }
            </Box>
            </>
        )
    }
}

export default NextMatchdaysGrid; 