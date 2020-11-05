import React from "react";
import { Box, Heading, Button, Text } from "grommet";
import { Edit } from "grommet-icons";
import StadiumMap from "./StadiumMap";

class MatchdayOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.editMatchday = this.editMatchday.bind(this);
    }

    editMatchday() {
        // TODO: Implement editing of a matchday
    }
    render() {
        return (
            <Box align="center" justify="between" pad="small" direction="row" border={{ "color": "brand", "size": "small", "style": "solid" }}>
                <Box direction="column" gap="xsmall">
                    <Heading level="4" margin="none">Heim gg. Gast</Heading>
                    <Text size="medium">00.00.0000 00:00</Text>
                    <Text size="medium">x Plätze Frei</Text>
                    <Heading level="4" margin="none">Stadionadresse</Heading>
                    <Text size="medium">Sportpark Mutterstadt</Text>
                    <Text size="medium">Waldstraße 49</Text>
                    <Text size="medium">67112 Mutterstadt</Text>
                    <Box width="small">
                        {this.props.isAdmin && <Button label="Bearbeiten" onClick={this.editMatchday} icon={<Edit />} />}
                    </Box>
                </Box>
                <StadiumMap />
            </Box>
        );
    }
}

export default MatchdayOverview