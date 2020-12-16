import React from "react";
import { Box } from "grommet";
import AnchorAppBar from "../../reuseComponents/AnchorAppBar";
import BookingTabs from "../components/BookingTabs";
import ContactForm from "../components/ContactForm";
import MatchdayOverview from "../../reuseComponents/MatchdayOverview";
import BookingConfirmationPage from "./BookingConfirmationPage";
import BookingCompletedPage from "./BookingCompletedPage";
import { getMatchById, postBooking } from "../../util/ApiRequests";
import { trimFormData } from "../../util/Helpers";

/**
 * @class BookingPage
 */
class BookingPage extends React.Component {

    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            b_hasStartedBooking: true,
            b_hasSubmittedForm: false,
            b_hasConfirmedBooking: false,
            b_isFullyBooked: false,
            o_formData: {},
            o_matchData: {},
            s_bookingCode: ""
        };
    }

    /**
     * Fetches the match data for the booking process
     */
    componentDidMount() {
        getMatchById(this.props.match.params.id).then(o_match => {
            this.setState({
                ...this.state,
                o_matchData: o_match.data
            });
            if (o_match.data.freeSpaces === 0 || o_match.data.isCancelled) {
                window.location.replace("/");
            }
        })
    }

    /**
     * submits the values from the form to the backend
     * @param {Object} event 
     */
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

    /**
     * Trims the values contained in formData
     * @param {Object} formData 
     */
    trimFormData(formData) {
        this.setState({
            ...this.state,
            o_formData: trimFormData(formData)
        })
    }

    /**
     * Confirms the booking and sets the form to submitted
     */
    confirmBooking() {
        const { o_formData, o_matchData } = this.state;
        this.trimFormData(o_formData);
        postBooking(o_matchData.id, o_formData).then(o_verificationCode => {
            if (o_verificationCode.error && o_verificationCode.error.errorCode === "BOOKNOSPACE") {
                this.setState({
                    ...this.state,
                    b_isFullyBooked: true,
                    b_hasSubmittedForm: true,
                    b_hasConfirmedBooking: true
                })
            } else {
                this.setState({
                    ...this.state,
                    s_bookingCode: o_verificationCode.data.verificationCode,
                    b_hasSubmittedForm: true,
                    b_hasConfirmedBooking: true
                });
            }
        })
    }

    /**
     * cancelled the confirmation and allows the user to go back to editing
     */
    editVisitorInformation() {
        this.setState({
            ...this.state,
            b_hasStartedBooking: true,
            b_hasSubmittedForm: false,
            b_hasConfirmedBooking: false,
        });
    }

    /**
     * Renders the booking page that allows users to register themselves to a match
     */
    render() {
        const { o_matchData, o_formData, b_hasConfirmedBooking, b_hasSubmittedForm, s_bookingCode, b_isFullyBooked } = this.state;
        return (
            <>
                <AnchorAppBar s_title="Terminbuchung" b_isNotHome />
                <BookingTabs b_isFormSubmitted={b_hasSubmittedForm} b_isBookingConfirmed={b_hasConfirmedBooking} />
                {this.state.b_hasStartedBooking &&
                    <Box pad="small" direction="column" align="center" width="auto">
                        <MatchdayOverview s_opponent={o_matchData.opponent} s_dateTime={o_matchData.date} i_freeSpaces={o_matchData.freeSpaces} />
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
                    <BookingCompletedPage s_bookingCode={s_bookingCode} b_isFullyBooked={b_isFullyBooked} />

                }
            </>
        );
    }
}

export default BookingPage;