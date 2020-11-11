import React from "react";
import { Card, CardBody, CardHeader, CardFooter, Button, Heading, Text } from "grommet";

class MatchdayCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            s_placesLeftColour : "status-ok"
        }
    }

    componentDidMount() {
        const { i_maxSpaces } = this.props; 
        if(i_maxSpaces <= 20) {
            this.setState({
                s_placesLeftColour: "status-warning"
            })
        } else if(i_maxSpaces === 0) {
            this.setState({
                s_placesLeftColour: "status-critical"
            })
        }
    }

    render() {
        const { b_isAdmin, s_opponent, s_dateTime, i_maxSpaces, b_isCancelled, i_matchId } = this.props;
        const s_formattedDate = new Date(s_dateTime);
        const s_time = "um " + s_formattedDate.toTimeString().substring(0, 5); 
        const s_date = s_formattedDate.getDate() + "." + (s_formattedDate.getMonth()+1) + "." + s_formattedDate.getFullYear(); 

        return (
            <Card height="small" width="medium">
                <CardHeader pad="medium" justify="center">
                    <Heading level="4" margin="none" textAlign="center">FG 08 Mutterstadt gg. {s_opponent}</Heading>
                </CardHeader>
                <CardBody pad="medium" justify="center" align="center">
                    <Text textAlign="center">{s_date + " " + s_time}</Text>
                    <Text textAlign="center">{i_maxSpaces} Plätze Frei</Text>
                    {b_isCancelled ?
                        <Text textAlign="center" color="status-error">Status: Fällt aus</Text>
                        : <Text textAlign="center" color="status-ok">Status: Geht vor!</Text>
                    }
                </CardBody>
                <CardFooter justify="end" pad="medium">
                    {b_isAdmin ?
                        <Button label="Spieltag Verwalten" />
                        :
                        <Button disabled={i_maxSpaces === 0} label="Platz Buchen" href={"/booking/" + i_matchId} />
                    }
                </CardFooter>
            </Card>
        );
    }
}

export default MatchdayCard;