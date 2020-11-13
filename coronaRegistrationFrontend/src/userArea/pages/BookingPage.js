import React from "react";
import { Box, Heading } from "grommet";
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
            o_matchData: {}
        };
    }

    componentDidMount() {
        const s_apiURL = "https://coronaprojekt.cfapps.eu10.hana.ondemand.com/api/matches/" + this.props.match.params.id
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
            o_formData: event.value
        });
    }

    confirmBooking() {
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
        const { o_matchData, o_formData, b_hasConfirmedBooking, b_hasStartedBooking, b_hasSubmittedForm } = this.state; 
        return (
            <>
                <AnchorAppBar title="Terminbuchung" />
                <BookingTabs b_isFormSubmitted={b_hasSubmittedForm} b_isBookingConfirmed={b_hasConfirmedBooking} />
                {this.state.b_hasStartedBooking &&
                    <Box pad="small" direction="column" align="center">
                        <MatchdayOverview s_opponent={o_matchData.opponent} s_dateTime={o_matchData.dateTime}/>
                        <ContactForm onSubmit={this.submitForm.bind(this)} o_formData={o_formData}/>
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
                    <BookingCompletedPage />
                }
            </>
        );
    }
}

export default BookingPage;