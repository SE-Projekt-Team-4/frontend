import React from "react";
import { Card, CardBody, CardHeader, Heading, Button} from "grommet";
import { AddCircle } from "grommet-icons";
import MatchdayManagementForm from "../../reuseComponents/MatchdayManagementForm";



class AddMatchdayCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            b_hasOpenedAddMatchday : false
        };

        this.openAddMatchdayForm = this.openAddMatchdayForm.bind(this); 
    }

    openAddMatchdayForm() {
        this.setState({
            b_hasOpenedAddMatchday: true
        })
    }
    
    closeAddMatchdayForm() {
        this.setState({
            b_hasOpenedAddMatchday: false
        })
    }

    render() {
        return (
            <Card height="small" width="medium" pad="medium" justify="center" align="center">
                <CardHeader>
                    <Heading level="4" margin="none" textAlign="center">Spieltag Hinzufügen</Heading>
                </CardHeader>
                <CardBody justify="center" >
                    <Button icon={<AddCircle size="xlarge" color="status-ok"/>} onClick={this.openAddMatchdayForm}/>
                    {this.state.b_hasOpenedAddMatchday &&
                    <MatchdayManagementForm s_title="Spieltag Anlegen" f_closeLayer={this.closeAddMatchdayForm.bind(this)}/>}
                </CardBody>
            </Card>
        )
    }
}

export default AddMatchdayCard; 