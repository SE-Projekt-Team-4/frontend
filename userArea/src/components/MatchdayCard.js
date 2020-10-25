import React from "react";
import {Card, CardBody, CardHeader, CardFooter, Button } from "grommet"; 

class MatchdayCard extends React.Component {
    
    
    
    
    render() {
        return (
            <Card height="medium" width="medium">
                <CardHeader pad="medium">Spieltag 1</CardHeader>
                <CardBody pad="medium"></CardBody>
                <CardFooter>
                    <Button primary label="Platz Buchen"></Button>
                </CardFooter>

            </Card>


        );
    }
}

export default MatchdayCard;