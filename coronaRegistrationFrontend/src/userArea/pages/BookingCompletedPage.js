import React from "react";
import { Box, Button, Heading, Paragraph } from "grommet";
import { Alert, Checkmark, Home } from "grommet-icons";
import QRCode from "qrcode.react";


class BookingCompletedPage extends React.Component {
    render() {
        const { s_bookingCode, b_isFullyBooked } = this.props;
        return (
            <>
                {b_isFullyBooked ?
                    <Box direction="column" align="center" pad="small">
                        <Heading level="2">Buchung Fehlgeschlagen!</Heading>
                        <Alert size="large" color="status-error" />
                        <Heading level="3">Für diesen Spieltag sind keine Plätze mehr verfügbar</Heading>
                        <Paragraph textAlign="center">Es tut uns leid, aber es hat sich wohl ein anderer Besucher den letzten Platz ergattert.
                        Schauen Sie sich doch einfach auf unserer Homepage nach anderen Spieltagen, die noch buchbar sind um!</Paragraph>
                        <Button primary label="Zurück zur Homepage" icon={<Home />} href="/" />
                    </Box>
                    :
                    <Box direction="column" align="center" pad="small">
                        <Heading level="2">Buchung Bestätigt!</Heading>
                        <Checkmark size="large" color="status-ok" />
                        <Heading level="3">Wir Freuen uns Sie bald begrüßen zu dürfen</Heading>
                        <Paragraph textAlign="center">Wir haben Ihnen alle Buchungsdetails an ihre angegebene E-Mail-Adresse geschickt.
                        Bitte halten Sie diese bis zum Spieltag bereit und zeigen Sie den QR-Code an der Ticketkasse vor. Bis dann!</Paragraph>
                        {s_bookingCode &&
                            <QRCode value={s_bookingCode} />}
                    </Box>}
            </>
        );
    }
}

export default BookingCompletedPage; 