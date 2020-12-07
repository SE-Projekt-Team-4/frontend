import React from "react";
import { Box, Button, FormField, Heading, TextInput, Layer } from "grommet";
import { Scan, Close } from "grommet-icons";
import VisitorInformationSummary from "../../reuseComponents/VisitorInformationSummary";

class UserCheckIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen,
            s_verificationCode: ""
        }

        this.closeLayer = this.closeLayer.bind(this);
    }

    closeLayer() {
        this.setState({
            isOpen: false
        });
    }

    redeemBooking() {
        fetch("/api/bookings/redeem",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "verificationCode": this.state.s_verificationCode,
                })
            })
            .then(result => result.json());
    }

    render() {
        const { f_closeLayer } = this.props;
        const { s_verificationCode } = this.state; 
        return (
            <Layer onEsc={f_closeLayer} onClickOutside={f_closeLayer}>
                <Box direction="row-responsive" gap="small">
                    <Box pad="small">
                        <Box direction="row-responsive">
                            <Box align="center" justify="center" width="90%" pad={{ left: "2.25rem" }}>
                                <Heading level="2" margin="none">Scan</Heading>
                            </Box>
                            <Box justify="end">
                                <Button icon={<Close />} onClick={f_closeLayer} />
                            </Box>
                        </Box>
                        <Box align="center">
                            <Button icon={<Scan size="xlarge" color="status-ok" />} />
                            <Heading level="2" margin="none">oder</Heading>
                            <FormField name="s_verificationCode" label="Buchungscode Eingeben:">
                                <TextInput placeholder="123456789" />
                            </FormField>
                            <Button primary label="Einchecken" />
                        </Box>
                    </Box>
                    {/* <VisitorInformationSummary/> */}
                </Box>
            </Layer>
        );
    }
}

export default UserCheckIn; 