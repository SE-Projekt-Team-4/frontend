import React from "react";
import { Box, Tab, Tabs } from "grommet";
import { Contact, List, Checkmark } from "grommet-icons";
import RichTabTitle from "./RichTabTitle"; 

class BookingTabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        return (
            <Box gap="medium" pad="medium">
                <Tabs>
                    <Tab title={<RichTabTitle
                        icon={<Contact />}
                        label="Dateneingabe" />}
                    />
                    <Tab
                        title={<RichTabTitle
                            icon={<List />}
                            label="Buchungsübersicht" />}
                        disabled="true"
                    />
                    <Tab title={<RichTabTitle
                        icon={<Checkmark />}
                        label="Fertig!" />}
                        disabled="true"
                    />
              </Tabs>
          </Box>   
        ); 
    }
}
export default BookingTabs;