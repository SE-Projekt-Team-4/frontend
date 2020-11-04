import React from "react";
import { Box, Heading, Button } from "grommet";
import AnchorAppBar from "../../reuseComponents/AnchorAppBar";
import BookingTabs from "../components/BookingTabs";
import ContactForm from "../components/ContactForm";
import MatchdayOverview from "../../reuseComponents/MatchdayOverview";

class BookingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <AnchorAppBar title="Terminbuchung" />
                <BookingTabs />
                <Box pad="medium" direction="column" width="75%">
                    <Heading>Spieltag:</Heading>
                    <MatchdayOverview isAdmin={true}/>
                    <ContactForm/>
                </Box>
            </>
        );
    }
}

export default BookingPage;