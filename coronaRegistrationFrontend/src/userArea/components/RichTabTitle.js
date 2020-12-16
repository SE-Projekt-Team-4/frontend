import React from "react"; 
import { Box, Text } from "grommet"; 
/**
 * @class RichTabTitle
 */
class RichTabTitle extends React.Component {

  /**
   * 
   * @param {*} props 
   */
    constructor(props) {
        super(props); 
        this.state = {}; 
    }

    /**
     * Renders the title of the booking tabs
     */
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