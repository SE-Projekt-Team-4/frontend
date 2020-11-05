import { Heading, Box, Text } from "grommet";
import React from "react";

class VisitorInformationSummary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Box align="start" justify="between" pad="small" border={{ "color": "brand", "size": "small", "style": "solid" }}>
                <Heading margin="none" level="4">Adressinformation</Heading>
                    <Text size="medium">{this.props.o_visitorData.s_firstName + " " + this.props.o_visitorData.s_surname}</Text>
                    <Text size="medium">{this.props.o_visitorData.s_street + " " + this.props.o_visitorData.s_houseNr}</Text>
                    <Text size="medium">{this.props.o_visitorData.s_postcode + " " + this.props.o_visitorData.s_city}</Text>
                <Heading margin="none" level="4">Kontaktdaten</Heading>
                    <Text size="medium">{"E-Mail: " + this.props.o_visitorData.s_email}</Text>
                    <Text size="medium">{"Telefonnummer: " + this.props.o_visitorData.s_telNr}</Text>
            </Box>

        );
    }
}

export default VisitorInformationSummary;