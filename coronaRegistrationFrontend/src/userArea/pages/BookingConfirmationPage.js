import { Heading, Box, Button } from "grommet";
import { FormNext } from "grommet-icons";
import React from "react";
import MatchdayOverview from "../../reuseComponents/MatchdayOverview";
import VisitorInformationSummary from "../components/VisitorInformationSummary";

class BookingConfirmationPage extends React.Component {
    render() {
        const { o_matchData, o_visitorData, onEditVisitorInformation, onConfirmBooking } = this.props; 
        return (
            <Box pad="medium" direction="column" width="75%">
                <Heading level="2">Buchungsübersicht</Heading>
                <MatchdayOverview s_opponent={o_matchData.opponent} s_dateTime={o_matchData.dateTime} i_maxSpaces={o_matchData.maxSpaces}/>
                <Heading level="3">Deine Eingabedaten</Heading>
                <VisitorInformationSummary o_visitorData={o_visitorData} onEditVisitorInformation={onEditVisitorInformation} />
                <Box direction="row-responsive" justify="end" pad={{"top": "medium"}}>
                    <Button primary reverse type="submit" label="Buchung Bestätigen" icon={<FormNext />} onClick={onConfirmBooking} gap="xxsmall"/>
                </Box>
            </Box>
        );
    }
}

export default BookingConfirmationPage;