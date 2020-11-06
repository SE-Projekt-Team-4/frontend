import { Heading, Box, Text, Button } from "grommet";
import { Edit } from "grommet-icons";
import React from "react";

class VisitorInformationSummary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Box direction="row-responsive" align="start" pad="small" justify="between" border={{ "color": "brand", "size": "small", "style": "solid" }}>
                <Box direction="column" justify="start">
                <Heading margin="none" level="4">Adressinformation</Heading>
                    <Text size="medium">{this.props.o_visitorData.s_firstName + " " + this.props.o_visitorData.s_surname}</Text>
                    <Text size="medium">{this.props.o_visitorData.s_street + " " + this.props.o_visitorData.s_houseNr}</Text>
                    <Text size="medium">{this.props.o_visitorData.s_postcode + " " + this.props.o_visitorData.s_city}</Text>
                <Heading margin="none" level="4">Kontaktdaten</Heading>
                    <Text size="medium">{"E-Mail: " + this.props.o_visitorData.s_email}</Text>
                    <Text size="medium">{"Telefonnummer: " + this.props.o_visitorData.s_telNr}</Text>
            </Box>
                <Button icon={<Edit />} onClick={this.props.onEditVisitorInformation}/>
            </Box>
        );
    }
}

export default VisitorInformationSummary;