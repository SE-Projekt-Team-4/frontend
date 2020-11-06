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
            o_formData: {}
        };
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
        return (
            <>
                <AnchorAppBar title="Terminbuchung" />
                <BookingTabs b_isFormSubmitted={this.state.b_hasSubmittedForm} b_isBookingConfirmed={this.state.b_hasConfirmedBooking} />
                {this.state.b_hasStartedBooking &&
                    <Box pad="medium" direction="column" width="75%">
                        <Heading level="2">Spieltag:</Heading>
                        <MatchdayOverview />
                        <ContactForm onSubmit={this.submitForm.bind(this)} o_formData={this.state.o_formData}/>
                    </Box>
                }
                {(this.state.b_hasSubmittedForm && !this.state.b_hasConfirmedBooking) &&
                    <BookingConfirmationPage
                        o_visitorData={this.state.o_formData}
                        onConfirmBooking={this.confirmBooking.bind(this)}
                        onEditVisitorInformation={this.editVisitorInformation.bind(this)}
                    />
                }
                {(this.state.b_hasConfirmedBooking && this.state.b_hasSubmittedForm) &&
                    <BookingCompletedPage />
                }
            </>
        );
    }
}

export default BookingPage;