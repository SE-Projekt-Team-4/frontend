import React from "react";
import { Box, Heading, Paragraph } from "grommet";
import { Checkmark } from "grommet-icons";
import QRCode from "qrcode.react";


class BookingCompletedPage extends React.Component {
    render() {
        const { s_bookingCode } = this.props; 
        return (
            <Box direction="column" align="center" pad="small">
                <Heading level="2">Buchung Bestätigt!</Heading>
                <Checkmark size="large" color="status-ok" />
                <Heading level="3">Wir Freuen uns Sie bald begrüßen zu dürfen</Heading>
                <Paragraph textAlign="center">Wir haben Ihnen alle Buchungsdetails an ihre angegebene E-Mail-Adresse geschickt. 
                Bitte halten Sie diese bis zum Spieltag bereit und zeigen Sie den QR-Code an der Ticketkasse vor. Bis dann!</Paragraph>
                {s_bookingCode &&
                <QRCode value={s_bookingCode} />}
            </Box>

        );
    }
}

export default BookingCompletedPage; 