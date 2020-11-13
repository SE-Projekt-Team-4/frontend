import { Heading, Box, Text, Button } from "grommet";
import { Edit } from "grommet-icons";
import React from "react";

class VisitorInformationSummary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {o_visitorData, onEditVisitorInformation} = this.props;
        return (
            <Box direction="row-responsive" align="start" pad="small" justify="between" border={{ "color": "brand", "size": "small", "style": "solid" }}>
                <Box direction="column" justify="start">
                <Heading margin="none" level="4">Adressinformation</Heading>
                    <Text size="medium">{o_visitorData.s_firstName + " " + o_visitorData.s_surname}</Text>
                    <Text size="medium">{o_visitorData.s_street + " " + o_visitorData.s_houseNr}</Text>
                    <Text size="medium">{o_visitorData.s_postcode + " " + o_visitorData.s_city}</Text>
                    <Text size="medium">{o_visitorData.s_country}</Text>
                <Heading margin="none" level="4">Kontaktdaten</Heading>
                    <Text size="medium">{"E-Mail: " + o_visitorData.s_email}</Text>
                    <Text size="medium">{"Telefonnummer: " + o_visitorData.s_telNr}</Text>
                </Box>
                <Button icon={<Edit />} onClick={onEditVisitorInformation}/>
            </Box>
        );
    }
}

export default VisitorInformationSummary;