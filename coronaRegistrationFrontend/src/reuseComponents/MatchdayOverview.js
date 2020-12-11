import React from "react";
import { Box, Heading, Button, Text } from "grommet";
import { Edit } from "grommet-icons";
import StadiumMap from "./StadiumMap";
import { formatDateTime } from "../util/Helpers";

class MatchdayOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            s_date: "",
            s_time: ""
        };
    }

    componentDidUpdate(prevProps) {
        if(prevProps.s_dateTime !== this.props.s_dateTime) {
            const o_dateTime = formatDateTime(this.props.s_dateTime);
            this.setState({
                s_date: o_dateTime.s_formattedDate,
                s_time: o_dateTime.s_time
            })
        }
    }

    render() {
        const { s_opponent, i_maxSpaces, b_isAdmin, f_openEditMatchday, i_freeSpaces } = this.props;
        const { s_date, s_time } = this.state;
        /* const s_formattedDate = new Date(s_dateTime);
        const s_time = "um " + s_formattedDate.toTimeString().substring(0, 5);
        const s_date = s_formattedDate.getDate() + "." + (s_formattedDate.getMonth() + 1) + "." + s_formattedDate.getFullYear(); */
        return (
            <Box align="center" justify="between" pad="small" direction="row-responsive" border={{ "color": "brand", "size": "small", "style": "solid" }}>
                <Box direction="column" gap="xsmall">
                    <Heading level="4" margin="none">Heim gg. {s_opponent}</Heading>
                    <Text size="medium">{s_date + " " + s_time}</Text>
                    {b_isAdmin ? <Text size="medium">{i_freeSpaces} von {i_maxSpaces} Plätze Frei</Text>
                        : <Text size="medium">{i_freeSpaces} Plätze Frei</Text>}
                    <Heading level="4" margin="none">Stadionadresse</Heading>
                    <Text size="medium">Sportpark Mutterstadt</Text>
                    <Text size="medium">Waldstraße 49</Text>
                    <Text size="medium">67112 Mutterstadt</Text>
                    <Box align="start">
                        {b_isAdmin && <Button icon={<Edit />} onClick={f_openEditMatchday} />}
                    </Box>
                </Box>
                <StadiumMap />
            </Box>
        );
    }
}

export default MatchdayOverview