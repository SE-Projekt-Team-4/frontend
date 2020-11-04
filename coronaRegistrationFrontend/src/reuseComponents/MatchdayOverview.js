import React from "react";
import { Box, Heading, Button, Text } from "grommet";
import { Edit } from "grommet-icons";

const stadiumAddress = ""
class MatchdayOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Box direction="column" gap="xsmall" pad="small" border={{ "color": "brand", "size": "small", "style": "solid" }} padding="medium">
                <Heading level="4">Heim gg. Gast</Heading>
                <Text size="medium">00.00.0000 00:00</Text>
                <Text size="medium">x Plätze Frei</Text>
                <Text size="medium">Sportpark Mutterstadt Waldstraße 49 67112 Mutterstadt</Text>

                <Box width="small">
                    {this.props.isAdmin && <Button label="Bearbeiten" icon={<Edit />} />}
                </Box>
            </Box>
        );
    }
}

export default MatchdayOverview