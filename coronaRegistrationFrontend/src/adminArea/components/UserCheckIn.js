import React from "react"; 
import { Box, Button ,FormField, Heading, TextInput, Layer  } from "grommet"; 
import { Scan} from "grommet-icons";
  
class UserCheckIn extends React.Component {

    constructor(props) {
        super(props); 
        
      }


    render() {

        const [open, setOpen] = React.useState();
    
        const onOpen = () => setOpen(true);
    
        const onClose = () => setOpen(undefined);
    

        return (
            
            


            <Box pad="medium" direction="column" width="100%" align="center">
                <Box>
                    <Button label="show" onClick={onOpen} />
                    {open && (
                        <Layer
                    onEsc={onClose}
                    onClickOutside={onClose}
                    >
                    <Button label="close" onClick={onOpen} />
                    </Layer>
                    )}
                </Box>


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