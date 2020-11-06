import React from "react"; 
import { Box, Text } from "grommet"; 

class RichTabTitle extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {}; 
    }

    render() {
        return (
            <Box direction="row-responsive" align="center" gap="xsmall" margin="xsmall">
            {this.props.icon}
            <Text size="small">
              <strong>{this.props.label}</strong>
            </Text>
          </Box>
        ); 
    }
}

export default RichTabTitle; 