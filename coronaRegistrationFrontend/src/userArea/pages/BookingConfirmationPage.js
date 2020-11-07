import { Heading, Box, Button } from "grommet";
import { FormNext } from "grommet-icons";
import React from "react";
import MatchdayOverview from "../../reuseComponents/MatchdayOverview";
import VisitorInformationSummary from "../components/VisitorInformationSummary";

class BookingConfirmationPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            o_visitorData: this.props.o_visitorData
        };
    }

    render() {
        return (
            <Box pad="medium" direction="column" width="75%">
                <Heading level="2">Buchungsübersicht</Heading>
                <MatchdayOverview />
                <Heading level="3">Deine Eingabedaten</Heading>
                <VisitorInformationSummary o_visitorData={this.state.o_visitorData} onEditVisitorInformation={this.props.onEditVisitorInformation} />
                <Box direction="row-responsive" justify="end" pad={{"top": "medium"}}>
                    <Button primary type="submit" label="Buchung Bestätigen" icon={<FormNext />} reverse={true} onClick={this.props.onConfirmBooking} gap="xxsmall"/>
                </Box>
            </Box>
        );
    }
}

export default BookingConfirmationPage;