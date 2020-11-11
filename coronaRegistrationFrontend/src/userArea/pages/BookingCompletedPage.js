import React from "react";
import { Box, Heading, Paragraph } from "grommet";
import { Checkmark } from "grommet-icons";


class BookingCompletedPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <Box direction="column" align="center" pad="small">
                <Heading level="2">Buchung Bestätigt!</Heading>
                <Checkmark size="large" color="status-ok" />
                <Heading level="3">Wir Freuen uns Sie bald begrüßen zu dürfen</Heading>
                <Paragraph textAlign="center">Wir haben ihnen alle buchungsdetails an ihre angegebene E-Mail adresse geschickt. 
                Bitte halten sie diese bis zum Spieltag bereit und zeigen sie den QR-Code im Mailinhalt an der Ticketkasse vor. Bis dann!</Paragraph>
            </Box>
        );
    }
}

export default BookingCompletedPage; 