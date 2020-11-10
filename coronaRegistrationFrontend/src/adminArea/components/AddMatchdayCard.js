import React from "react";
import { Card, CardBody, CardHeader, Heading, Button} from "grommet"
import { AddCircle } from "grommet-icons";



class AddMatchdayCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <Card height="medium" width="medium" pad="medium" justify="center" align="center">
                <CardHeader>
                    <Heading level="4" margin="none" textAlign="center">Spieltag Hinzufügen</Heading>
                </CardHeader>
                <CardBody justify="center" >
                    <Button icon={<AddCircle size="xlarge" color="neutral-1" />}/>
                </CardBody>

            </Card>
        )
    }
}

export default AddMatchdayCard; 