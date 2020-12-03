import React from "react"; 
import { Layer, Box, Heading, Button } from "grommet";
import { Close } from "grommet-icons";

class MatchdayManagementForm extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {}; 
    }

    render() {
        const { s_title, f_closeLayer } = this.props; 
        return(
            <Layer position="right" full="vertical">
                <Box direction="row-responsive" align="center" justify="between">
                    <Heading level="3" margin="none">{s_title}</Heading>
                    <Button icon={<Close />} onClick={f_closeLayer} />
                </Box>
            </Layer>
        )
    }
}

export default MatchdayManagementForm; 