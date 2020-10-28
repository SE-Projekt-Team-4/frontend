import React from "react";
import { Grommet, Card, CardBody, CardHeader, CardFooter, Button } from "grommet"; 

class MatchdayCard extends React.Component {
    render() {
        return (
            <Grommet>
            <Card height="medium" width="medium">
                <CardHeader pad="medium">Spieltag 1</CardHeader>
                <CardBody pad="medium"></CardBody>
                <CardFooter>
                    <Button primary label="Platz Buchen"></Button>
                </CardFooter>
            </Card>
            </Grommet>
        );
    }
}

export default MatchdayCard;