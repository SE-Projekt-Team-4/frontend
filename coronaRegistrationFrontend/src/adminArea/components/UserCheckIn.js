import React from "react";
import { Box, Button, FormField, Heading, TextInput, Layer } from "grommet";
import { Scan } from "grommet-icons";

class UserCheckIn extends React.Component {

    constructor(props) {
        super(props);


        this.closeLayer = this.closeLayer.bind(this);
    }

    closeLayer() {

    }


    render() {
        return (
            <Box pad="medium" direction="column" width="100%" align="center">
                <Layer
                    onEsc={this.closeLayer}
                    onClickOutside={this.closeLayer}
                >
                    <Box direction="column" pad="medium" align="center">
                        <Heading level="2" margin="none">Scan</Heading>
                        <Button icon={<Scan size="xlarge" color="status-ok" />} />
                    </Box>

                    <Heading level="2" margin="none">or</Heading>

                    <Box pad="medium" align="center">
                        <FormField label="Enter Customer ID">
                            <TextInput placeholder="Customer ID" />
                        </FormField>
                    </Box>
                </Layer>
            </Box>
        );
    }
}

export default UserCheckIn; 