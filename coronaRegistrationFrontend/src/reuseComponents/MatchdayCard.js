import React from "react";
import { Grommet, Card, CardBody, CardHeader, CardFooter, Button } from "grommet"; 
import { Router, Link } from "react-router-dom";
import BookingPage from "../userArea/pages/BookingPage"

class MatchdayCard extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {}; 
        this.navToBookingPage = this.navToBookingPage.bind(this);
    }

    navToBookingPage = () => {
        return <Link to="/booking"/>;
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