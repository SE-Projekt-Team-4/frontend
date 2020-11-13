import React from "react"
import { Heading, Box } from "grommet"
import AnchorAppBar from "../../reuseComponents/AnchorAppBar"
import MatchdayOverview from "../../reuseComponents/MatchdayOverview"
import UserDataTable from "../components/UserDataTable"

class MatchdayManager extends React.Component {
    render() {
        return(
            <>
                <AnchorAppBar title="Spieltag Verwalten"/>
                <Box pad="medium" direction="column" width="75%">
                        <MatchdayOverview />
                    </Box>
    
                    <Heading level="3" textAlign="start" color="black" margin= "medium" > Besucherliste</Heading>
                    
                    <Box pad="medium" direction="column" width="100%">
                        <UserDataTable />
                    </Box>
            
                
            </>
        )
    }
}

export default MatchdayManager; 