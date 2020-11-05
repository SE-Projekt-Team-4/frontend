import React from "react";
import { Box, Heading, Button } from "grommet";
import AnchorAppBar from "../../reuseComponents/AnchorAppBar";
import BookingTabs from "../components/BookingTabs";
import ContactForm from "../components/ContactForm";
import MatchdayOverview from "../../reuseComponents/MatchdayOverview";
import BookingConfirmationPage from "./BookingConfirmationPage";

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


    render() {
        return (
            <>
                <AnchorAppBar title="Terminbuchung" />
                <BookingTabs b_isFormSubmitted={this.state.b_hasSubmittedForm} b_isBookingConfirmed={this.state.b_hasConfirmedBooking} />
                {this.state.b_hasStartedBooking &&
                    <Box pad="medium" direction="column" width="75%">
                        <Heading level="2">Spieltag:</Heading>
                        <MatchdayOverview />
                        <ContactForm onSubmit={this.submitForm.bind(this)} />
                    </Box>
                }
                {this.state.b_hasSubmittedForm && <BookingConfirmationPage o_visitorData={this.state.o_formData} />}
            </>
        );
    }
}

export default BookingPage;