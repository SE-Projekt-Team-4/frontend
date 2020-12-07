import React from "react";
import { Box } from "grommet";
import AnchorAppBar from "../../reuseComponents/AnchorAppBar";
import BookingTabs from "../components/BookingTabs";
import ContactForm from "../components/ContactForm";
import MatchdayOverview from "../../reuseComponents/MatchdayOverview";
import BookingConfirmationPage from "./BookingConfirmationPage";
import BookingCompletedPage from "./BookingCompletedPage";

class BookingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            b_hasStartedBooking: true,
            b_hasSubmittedForm: false,
            b_hasConfirmedBooking: false,
            o_formData: {},
            o_matchData: {},
            s_bookingCode: ""
        };
    }

    componentDidMount() {
        const s_apiURL = "/api/matches/" + this.props.match.params.id;
        fetch(s_apiURL,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    o_matchData: result.data
                });
            },
                (error) => {
                    this.setState({
                        ...this.state,
                        error
                    })
                }
            )
    }

    submitForm(event) {
        this.setState({
            ...this.state,
            b_hasStartedBooking: false,
            b_hasSubmittedForm: true,
            o_formData: {
                ...event.value,
                s_country: event.value.s_country.label
            }
        });
    }

    trimFormData(formData) {
        const trimmedFormData = Object.keys(formData).map(key => formData[key] = formData[key].trim());
        this.setState({
            ...this.state,
            o_formData: trimmedFormData
        })
    }

    confirmBooking() {
        const { o_formData, o_matchData } = this.state;
        this.trimFormData(o_formData);
        fetch("/api/bookings",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json', 
                },
                body: JSON.stringify({
                    "matchId": o_matchData.id.toString(),
                    "fName": o_formData.s_firstName,
                    "lName": o_formData.s_surname,
                    "city": o_formData.s_city,
                    "postcode": o_formData.s_postcode,
                    "street": o_formData.s_street,
                    "houseNumber": o_formData.s_houseNr,
                    "phoneNumber" : o_formData.s_telNr,
                    "eMail": o_formData.s_email
                })
            })
            .then(result => result.json())
            .then((result) => {
                this.setState({
                    s_bookingCode: result.data.verificationCode
                });
            });

        this.setState({
            ...this.state,
            b_hasSubmittedForm: true,
            b_hasConfirmedBooking: true
        })

    }

    editVisitorInformation() {
        this.setState({
            ...this.state,
            b_hasStartedBooking: true,
            b_hasSubmittedForm: false,
            b_hasConfirmedBooking: false,
        });
    }

    render() {
        const { o_matchData, o_formData, b_hasConfirmedBooking, b_hasSubmittedForm, s_bookingCode } = this.state;
        return (
            <>
                <AnchorAppBar s_title="Terminbuchung" b_isNotHome />
                <BookingTabs b_isFormSubmitted={b_hasSubmittedForm} b_isBookingConfirmed={b_hasConfirmedBooking} />
                {this.state.b_hasStartedBooking &&
                    <Box pad="small" direction="column" align="center" width="auto">
                        <MatchdayOverview s_opponent={o_matchData.opponent} s_dateTime={o_matchData.date} i_freeSpaces={o_matchData.freeSpaces}/>
                        <ContactForm onSubmit={this.submitForm.bind(this)} o_formData={o_formData} />
                    </Box>
                }
                {(b_hasSubmittedForm && !b_hasConfirmedBooking) &&
                    <BookingConfirmationPage
                        o_matchData={o_matchData}
                        o_visitorData={o_formData}
                        onConfirmBooking={this.confirmBooking.bind(this)}
                        onEditVisitorInformation={this.editVisitorInformation.bind(this)}
                    />
                }
                {(b_hasConfirmedBooking && b_hasSubmittedForm) &&
                    <BookingCompletedPage s_bookingCode={s_bookingCode} />
                }
            </>
        );
    }
}

export default BookingPage;