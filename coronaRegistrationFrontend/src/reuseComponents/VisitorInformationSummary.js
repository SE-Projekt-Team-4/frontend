import { Heading, Box, Text, Button } from "grommet";
import { Edit } from "grommet-icons";
import React from "react";

/**
 * @class VisitorInformationSummary
 */
class VisitorInformationSummary extends React.Component {

    /**
     * Renders a summary of the data a customer has entered for the booking process
     */
    render() {
        const { b_canEditVisitorInformation, onEditVisitorInformation, s_firstName, s_surname, s_street, s_houseNr, s_postcode, s_city, s_country, s_email, s_telNr } = this.props;
        return (
            <Box direction="row-responsive" align="start" pad="small" justify="between" border={{ "color": "brand", "size": "small", "style": "solid" }}>
                <Box direction="column" justify="start">
                    <Heading margin="none" level="4">Adressinformation</Heading>
                    <Text size="medium">{s_firstName + " " + s_surname}</Text>
                    <Text size="medium">{s_street + " " + s_houseNr}</Text>
                    <Text size="medium">{s_postcode + " " + s_city}</Text>
                    <Text size="medium">{s_country}</Text>
                    <Heading margin="none" level="4">Kontaktdaten</Heading>
                    <Text size="medium">{"E-Mail: " +  s_email}</Text>
                    <Text size="medium">{"Telefonnummer: " +  s_telNr}</Text>
                </Box>
                {b_canEditVisitorInformation &&
                    <Button icon={<Edit />} onClick={onEditVisitorInformation} />
                }
            </Box>
        );
    }
}

export default VisitorInformationSummary;