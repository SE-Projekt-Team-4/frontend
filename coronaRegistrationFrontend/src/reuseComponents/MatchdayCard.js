import React from "react";
import { Card, CardBody, CardHeader, CardFooter, Button, Heading, Text } from "grommet";

class MatchdayCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { b_isAdmin, s_opponent, s_dateTime, i_maxSpaces, b_isCancelled} = this.props;
        return (
            <Card height="medium" width="medium">
                <CardHeader pad="medium" justify="center">
                    <Heading level="4" margin="none" textAlign="center">FG 08 Mutterstadt gg. {s_opponent}</Heading>
                </CardHeader>
                <CardBody pad="medium" justify="center" align="center">
                    <Text>{s_dateTime}</Text> 
                    <Text>{i_maxSpaces} Plätze Frei</Text>
                    <Text>{b_isCancelled}</Text>
                </CardBody>
                <CardFooter justify="end" pad="medium">
                    {b_isAdmin ?
                        <Button label="Spieltag Verwalten" />
                        :
                        <Button label="Platz Buchen" href="/booking" />}
                </CardFooter>
            </Card>
        );
    }
}

export default MatchdayCard;