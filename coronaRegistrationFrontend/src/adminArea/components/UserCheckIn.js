import React from "react";
import { Box, Button, FormField, Heading, TextInput, Layer, Text } from "grommet";
import { Checkmark, Alert } from "grommet-icons";
import VisitorInformationSummary from "../../reuseComponents/VisitorInformationSummary";
import { getRedeemBooking } from "../../util/ApiRequests";
import QrReader from "react-qr-scanner";

class UserCheckIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            b_isOpen: true,
            s_verificationCode: "",
            b_isValidBookingCode: false,
            b_hasCheckedIn: false, 
            o_visitorData: {
                s_firstName: "", 
                s_surname: "", 
                s_street: "", 
                s_houseNr: "", 
                s_postcode: "", 
                s_city: "", 
                s_country: "", 
                s_email: "", 
                s_telNr: ""
            }
        }
        this.redeemBooking = this.redeemBooking.bind(this);
        this.scanQRCode = this.scanQRCode.bind(this);
    }

    redeemBooking() {
        getRedeemBooking(this.state.s_verificationCode).then(o_redeemResponse => {
            if (o_redeemResponse.error && (o_redeemResponse.error.status === 404 || o_redeemResponse.error.status === 422)) {
                this.setState({
                    ...this.state,
                    b_isValidBookingCode: false
                });
            } else if (o_redeemResponse.data) {
                this.setState({
                    ...this.state,
                    b_isValidBookingCode: true,
                    o_visitorData: {
                        s_firstName: o_redeemResponse.data.visitor.fName, 
                        s_surname: o_redeemResponse.data.visitor.lName, 
                        s_street: o_redeemResponse.data.visitor.street, 
                        s_houseNr: o_redeemResponse.data.visitor.houseNumber, 
                        s_postcode: o_redeemResponse.data.visitor.postcode, 
                        s_city: o_redeemResponse.data.visitor.city, 
                        s_email: o_redeemResponse.data.visitor.eMail,
                        s_telNr: o_redeemResponse.data.visitor.phoneNumber 
                    }
                });
            }
        })
    }
    scanQRCode(result) {
        if (result) {
            this.setState({
                ...this.state,
                s_verificationCode: result,
                b_hasCheckedIn: true
            })
            this.redeemBooking();
        }
    }

    render() {
        const { f_closeLayer } = this.props;
        const { s_verificationCode, b_isValidBookingCode, b_hasCheckedIn, o_visitorData } = this.state;
        return (
            <Layer onEsc={f_closeLayer} onClickOutside={f_closeLayer} width="100%">
                <Box direction="row-responsive" gap="small" border={{ "side": "between", "color": "dark-1" }}>
                    <Box pad="small">
                        <Box direction="row-responsive">
                            <Box align="center" justify="center" width="90%" pad={{ left: "2.25rem" }}>
                                <Heading level="2" margin="none">Scan</Heading>
                            </Box>
                        </Box>
                        <Box align="center">
                            <Box wrap align="center" justify="center" border={{ "color": "status-error", "size": "medium", "style": "dashed" }}>
                                <QrReader style={{ width: "15rem", objectFit: "fill"}} delay={200} resolution={250} onScan={this.scanQRCode} />
                            </Box>
                            <Heading level="2" margin="none">oder</Heading>
                            <FormField name="s_verificationCode" label="Buchungscode Eingeben:" value={s_verificationCode}>
                                <TextInput placeholder="123456789" value={s_verificationCode} />
                            </FormField>
                            <Button primary label="Einchecken" onClick={this.redeemBooking} />
                        </Box>
                    </Box>
                    {b_hasCheckedIn &&
                        <Box direction="row-responsive" pad="small" width="60%" animation="slideRight">
                            {b_isValidBookingCode ?
                                <Box direction="column">
                                    <Heading level="4" marign="none">Gültige Buchung</Heading>
                                    <Checkmark size="medium" color="status-ok" />
                                    <VisitorInformationSummary
                                        s_firstName={o_visitorData.s_firstName}
                                        s_surname={o_visitorData.s_surname}
                                        s_street={o_visitorData.s_street}
                                        s_houseNr={o_visitorData.s_houseNr}
                                        s_postcode={o_visitorData.s_postcode}
                                        s_city={o_visitorData.s_city}
                                        s_country={o_visitorData.s_country}
                                        s_email={o_visitorData.s_email}
                                        s_telNr={o_visitorData.s_telNr} />
                                </Box> :
                                <>
                                    <Box direction="column" gap="small">
                                        <Heading level="4" margin="none">Ungültige Buchung</Heading>
                                        <Text size="small">Dieser Buchungscode ist entweder ungültig oder er wurde bereits verwendet</Text>
                                    </Box>
                                    <Alert size="medium" color="status-error" />
                                </>
                            }
                        </Box>
                    }
                </Box>
            </Layer>
        );
    }
}

export default UserCheckIn; 