import React from "react";
import { Box, Heading, Button } from "grommet";
import AnchorAppBar from "../../reuseComponents/AnchorAppBar";
import BookingTabs from "../components/BookingTabs";

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
                <Box pad="medium" direction="row">
                    <Heading>Spieltag:</Heading>
                </Box>
            </>
        );
    }
}

export default BookingPage;