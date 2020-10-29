import React from "react";
import { Grommet, Card, CardBody, CardHeader, CardFooter, Button } from "grommet"; 

class MatchdayCard extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {}; 
    }

    render() {
        return (
            <Grommet>
            <Card height="medium" width="medium">
                <CardHeader pad="medium">Spieltag 1</CardHeader>
                <CardBody pad="medium"></CardBody>
                <CardFooter>
                    <Button primary label="Platz Buchen" href="/booking"></Button>
                </CardFooter>
            </Card>
            </Grommet>
        );
    }
}

export default MatchdayCard;