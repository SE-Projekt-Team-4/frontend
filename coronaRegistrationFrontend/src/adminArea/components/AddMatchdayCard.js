import React from "react";
import { Card, CardBody, CardHeader, Heading, Button} from "grommet";
import { AddCircle } from "grommet-icons";
import MatchdayManagementForm from "../../reuseComponents/MatchdayManagementForm";


/**
 * @module AddMatchdayCard
 * @version 3.1.1
 */
class AddMatchdayCard extends React.Component {

    /**
     * 
     * @param {*} props
     * @param {boolean} b_hasOpenedAddMatchday Defines wheather the AddMatchdayOptions should be opened 
     * @returns {void}
     */
    constructor(props) {
        super(props);
        this.state = {
            b_hasOpenedAddMatchday : false
        };
        this.toggleAddMatchday = this.toggleAddMatchday.bind(this); 
    }

    /**
     * This Function opens or closes the Add Matchday options it is called when clicked on the add Matchday card
     * @returns {void}
     */
    toggleAddMatchday() {
        const { b_hasOpenedAddMatchday } = this.state;
        if(b_hasOpenedAddMatchday) {
            this.setState({
                ...this.state,
                b_hasOpenedAddMatchday: false
            });
        } else if(!b_hasOpenedAddMatchday) {
            this.setState({
                ...this.state,
                b_hasOpenedAddMatchday: true
            });
        }
    }
    /**
    *  Renders the Add Matchday Card on the Admin Page
    */
    render() {
        return (
            <Card height="small" width="medium" pad="medium" justify="center" align="center">
                <CardHeader>
                    <Heading level="4" margin="none" textAlign="center">Spieltag Hinzufügen</Heading>
                </CardHeader>
                <CardBody justify="center" >
                    <Button icon={<AddCircle size="xlarge" color="status-ok"/>} onClick={this.toggleAddMatchday}/>
                    {this.state.b_hasOpenedAddMatchday &&
                    <MatchdayManagementForm s_title="Spieltag Anlegen" f_passMatchdayDataToParent={this.props.f_updateMatchdays} f_closeLayer={this.toggleAddMatchday.bind(this)}/>}
                </CardBody>
            </Card>
        )
    }
}

export default AddMatchdayCard; 