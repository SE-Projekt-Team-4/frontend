import React from "react";
import { Box, Button, FormField, Heading, TextInput, Layer, Text } from "grommet";
import { Checkmark, Alert } from "grommet-icons";
import VisitorInformationSummary from "../../reuseComponents/VisitorInformationSummary";
import { redeemBooking } from "../../util/ApiRequests";
import QrReader from "react-qr-scanner";

/**
 * @class UserCheckIn
 * @version 6.2.2
*/
class UserCheckIn extends React.Component {

    /**
     * 
     * @param {*} props 
     *    
     */
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
        this.handleInputChange = this.handleInputChange.bind(this); 
    }
    /**
     * Redeems the booking for a customer, pushing the update to the backend
     */
    redeemBooking() {
        redeemBooking(this.state.s_verificationCode).then(o_redeemResponse => {
            if (o_redeemResponse.error && (o_redeemResponse.error.errorCode === "REDEEMNOMATCH" || o_redeemResponse.error.errorCode === "ALREADYREDEEMED")) {
                this.setState({
                    ...this.state,
                    b_isValidBookingCode: false, 
                    b_hasCheckedIn: true
                });
            } else if (o_redeemResponse.data) {
                this.setState({
                    ...this.state,
                    b_isValidBookingCode: true,
                    b_hasCheckedIn: true,
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
    /**
     * Scans the QR code from a booking
     * @param {String} result Returns the Verification code saved in the QR code form as a String
     */
    scanQRCode(result) {
        if (result) {
            this.setState({
                ...this.state,
                s_verificationCode: result
            }); 
            this.redeemBooking(); 
        }
    }

    /**
     * Updates the corresponding variables when changing an input
     * @param {*} event contains meta data from the change
     */
    handleInputChange(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });

    }

    /**
     * Renders the UserCheckin Option. The details are shown when clicked on Check in
     */
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
                                <QrReader style={{ width: "15rem", objectFit: "none" }} delay={3000} resolution={250} onScan={this.scanQRCode} />
                            </Box>
                            <Heading level="2" margin="none">oder</Heading>
                            <FormField label="Buchungscode Eingeben:">
                                <TextInput name="s_verificationCode" placeholder="123456789" value={s_verificationCode} onChange={this.handleInputChange}/>
                            </FormField>
                            <Button primary label="Einchecken" onClick={this.redeemBooking} />
                        </Box>
                    </Box>
                    {b_hasCheckedIn &&
                        <Box align="center" gap="medium" animation="slideRight" pad="small">
                            {b_isValidBookingCode ?
                                <Box animation="slideRight">
                                    <Box direction="row-responsive" gap="small" justify="center" align="center">
                                        <Heading level="3" margin="none">Gültige Buchung</Heading>
                                        <Checkmark size="medium" color="status-ok" />
                                    </Box>
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
                                    <Box gap="medium" animation="slideRight" pad="small">
                                        <Box direction="row-responsive" gap="small" justify="center" align="center">
                                            <Heading level="3" margin="none">Ungültige Buchung</Heading>
                                            <Alert size="medium" color="status-error" />
                                        </Box>
                                        <Box align="center">
                                            <Text size="small">Dieser Buchungscode ist entweder ungültig oder er wurde bereits verwendet</Text>
                                        </Box>
                                    </Box>

                                </>
                            }
                            <Text size="small">Sie können nun den nächsten Besucher registrieren</Text>
                        </Box>
                    }
                </Box>
            </Layer>
        );
    }
}

export default UserCheckIn; 