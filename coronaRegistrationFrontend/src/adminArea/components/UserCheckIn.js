import React from "react"; 
import { Box, Button ,FormField, Heading, TextInput  } from "grommet"; 
import { Scan} from "grommet-icons";
class UserCheckIn extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {}; 
    }

    render() {
        return (
            
            <Box pad="medium" direction="column" width="100%" align="center">

                <Box direction="column" pad="medium" align="center">
                <Heading level="2" margin="none">Scan</Heading>
                <Button icon={<Scan size="xlarge" color="status-ok" />}/>
                </Box>

                <Heading level="2" margin="none">or</Heading>

                <Box pad="medium" align="center">
                <FormField label="Enter Customer ID">
                    <TextInput placeholder="Customer ID" />
                </FormField>
                </Box>

            </Box>
            
            
        ); 
    }
}

export default UserCheckIn; 