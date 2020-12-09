import React from "react";
import { Box, Button, FormField, Heading, TextInput, Layer, Text } from "grommet";
import { Scan, Close, Checkmark, Alert } from "grommet-icons";
import VisitorInformationSummary from "../../reuseComponents/VisitorInformationSummary";
import { getRedeemBooking } from "../../util/ApiRequests";

class UserCheckIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            b_isOpen: true,
            s_verificationCode: "",
            b_isValidBookingCode: undefined
        }
        this.redeemBooking = this.redeemBooking.bind(this);
    }

    redeemBooking() {
        getRedeemBooking(this.state.s_verificationCode).then(o_redeemResponse => {
            if (o_redeemResponse.error.status === 404) {
                this.setState({
                    ...this.state,
                    b_isValidBookingCode: false
                });
            } else if (o_redeemResponse.error.status === 200) {
                this.setState({
                    ...this.state,
                    b_isValidBookingCode: true
                });
            }
        })
    }

    render() {
        const { f_closeLayer } = this.props;
        const { s_verificationCode, b_isValidBookingCode } = this.state;
        return (
            <Layer onEsc={f_closeLayer} onClickOutside={f_closeLayer} width="100%">
                <Box direction="row-responsive" gap="small" border={{ "side": "between", "color": "dark-1" }}>
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
                            <FormField name="s_verificationCode" label="Buchungscode Eingeben:" value={s_verificationCode}>
                                <TextInput placeholder="123456789" />
                            </FormField>
                            <Button primary label="Einchecken" onClick={this.redeemBooking} />
                        </Box>
                    </Box>
                    <Box direction="row-responsive" pad="small" width="60%" animation="slideRight">
                        {b_isValidBookingCode ?
                            <>
                                <Heading level="4" marign="none">Gültige Buchung</Heading>
                                <Checkmark size="medium" color="status-ok" />
                            </> :
                            <>
                                <Box direction="column" gap="small">
                                    <Heading level="4" margin="none">Ungültige Buchung</Heading>
                                    <Text size="small">Dieser Buchungscode ist entweder ungültig oder er wurde bereits verwendet</Text>
                                </Box>
                                <Alert size="medium" color="status-error" />
                            </>
                        }
                    </Box>
                </Box>
            </Layer>
        );
    }
}

export default UserCheckIn; 