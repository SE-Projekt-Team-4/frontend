import React from "react";
import { Card, CardBody, CardHeader, CardFooter, Button, Heading, Text } from "grommet";
import { formatDateTime } from "../util/Helpers";

/**
 * @class MatchdayCard
 */
class MatchdayCard extends React.Component {

    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            s_placesLeftColour: "status-ok",
            s_date: "",
            s_time: ""
        }

        this.setDateTime = this.setDateTime.bind(this);
    }

    /**
     * sets the color of the remaining places for a matchday colors red when there are no places left, colors orange when there is less then 20 places left
     */
    componentDidMount() {
        const { i_freeSpaces } = this.props;
        if (i_freeSpaces === 0) {
            this.setState({
                ...this.state,
                s_placesLeftColour: "status-critical"
            })
        } else if (i_freeSpaces <= 20) {
            this.setState({
                ...this.state,
                s_placesLeftColour: "status-warning"
            })
        }
        this.setDateTime();
    }

    /**
     * sets and formats the date and time of the matchday
     */
    setDateTime() {
        const { s_dateTime } = this.props; 
        const o_date = formatDateTime(s_dateTime);
        this.setState({
            ...this.state,
            s_date: o_date.s_formattedDate,
            s_time: o_date.s_time, 
            b_isInPast: new Date(s_dateTime) - Date.now() <= 0
        })
    }

    /**
     * Renders a matchdaycard as an overview to a matchday
     */
    render() {
        const { b_isAdmin, s_opponent, i_freeSpaces, b_isCancelled, i_matchId } = this.props;
        const { s_placesLeftColour, s_time, s_date, b_isInPast } = this.state;
        return (
            <Card height="small" width="medium">
                <CardHeader pad="medium" justify="center">
                    <Heading truncate level="4" margin="none" textAlign="center">FG 08 Mutterstadt gg. {s_opponent}</Heading>
                </CardHeader>
                <CardBody pad="medium" justify="center" align="center">
                    <Text textAlign="center">{s_date + " " + s_time}</Text>
                    <Text textAlign="center" color={s_placesLeftColour}>{i_freeSpaces} Plätze Frei</Text>
                    {b_isCancelled ?
                        <Text textAlign="center" color="status-error">Status: Fällt aus</Text>
                        : <Text textAlign="center" color="status-ok">Status: Findet Statt!</Text>
                    }
                </CardBody>
                <CardFooter justify="end" pad="medium">
                    {b_isAdmin ?
                        <Button label="Spieltag Verwalten" href={"/admin/editMatch/" + i_matchId} />
                        :
                        <Button disabled={(i_freeSpaces === 0 || b_isCancelled || b_isInPast)} label="Platz Buchen" href={"/booking/" + i_matchId} />
                    }
                </CardFooter>
            </Card>
        );
    }
}

export default MatchdayCard;