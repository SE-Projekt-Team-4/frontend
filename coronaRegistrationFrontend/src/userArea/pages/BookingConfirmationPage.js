import { Heading, Box, Button } from "grommet";
import { FormNext } from "grommet-icons";
import React from "react";
import MatchdayOverview from "../../reuseComponents/MatchdayOverview";
import VisitorInformationSummary from "../../reuseComponents/VisitorInformationSummary";

class BookingConfirmationPage extends React.Component {
    render() {
        const { o_matchData, o_visitorData, onEditVisitorInformation, onConfirmBooking } = this.props; 
        return (
            <Box pad="medium" direction="column" width="75%">
                <Heading level="2">Buchungsübersicht</Heading>
                <MatchdayOverview s_opponent={o_matchData.opponent} s_dateTime={o_matchData.date} i_maxSpaces={o_matchData.maxSpaces}/>
                <Heading level="3">Ihre Eingabedaten</Heading>
                <VisitorInformationSummary 
                    b_canEditVisitorInformation
                    s_firstName={o_visitorData.s_firstName} 
                    s_surname={o_visitorData.s_surname} 
                    s_street={o_visitorData.s_street} 
                    s_houseNr={o_visitorData.s_houseNr} 
                    s_postcode={o_visitorData.s_postcode} 
                    s_city={o_visitorData.s_city} 
                    s_country={o_visitorData.s_country} 
                    s_email={o_visitorData.s_email} 
                    s_telNr={o_visitorData.s_telNr} 
                    onEditVisitorInformation={onEditVisitorInformation} />
                <Box direction="row-responsive" justify="end" pad={{"top": "medium"}}>
                    <Button primary reverse type="submit" label="Buchung Bestätigen" icon={<FormNext />} onClick={onConfirmBooking} gap="xxsmall"/>
                </Box>
            </Box>
        );
    }
}

export default BookingConfirmationPage;