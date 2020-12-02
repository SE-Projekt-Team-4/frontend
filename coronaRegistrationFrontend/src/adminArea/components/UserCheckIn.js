import React from "react";
import { Box, Button, FormField, Heading, TextInput, Layer, Grid } from "grommet";
import { Scan, Close } from "grommet-icons";

class UserCheckIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen
        }

        this.closeLayer = this.closeLayer.bind(this);
    }

    closeLayer() {
        this.setState({
            isOpen: false
        }); 
    }


    render() {
        const { closeLayer } = this.props; 
        return (
            <Layer onEsc={closeLayer} onClickOutside={closeLayer}>
                <Box pad="small">

                    <Box direction="row-responsive">
                        <Box align="center" justify="center" width="90%" pad={{ left: "2.25rem" }}>
                            <Heading level="2" margin="none">Scan</Heading>
                        </Box>
                        <Box justify="end">
                            <Button icon={<Close />} onClick={closeLayer} />
                        </Box>
                    </Box>
                    <Box align="center">
                        <Button icon={<Scan size="xlarge" color="status-ok" />} />
                        <Heading level="2" margin="none">oder</Heading>
                        <FormField label="Buchungscode Eingeben:">
                            <TextInput placeholder="123456789" />
                        </FormField>
                        <Button primary label="Einchecken" />
                    </Box>
                </Box>
            </Layer>
        );
    }
}

export default UserCheckIn; 