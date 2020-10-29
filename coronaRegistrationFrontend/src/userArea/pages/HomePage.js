import React from "react";
import { Box, Grid, Heading, Button, Image } from "grommet";
import MatchdayCard from "../../reuseComponents/MatchdayCard";
import AnchorAppBar from "../../reuseComponents/AnchorAppBar";
import { Download } from "grommet-icons";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
    render() {
        return(
            <Box fill>
                <AnchorAppBar title="Homepage" />
                <Box flex direction="column" align="center" alignContent="center" justify="center" background="url(./footballbackground.jpg)">
                    <Heading level="3" textAlign="center" color="light-1">Wilkommen bei der Terminbuchung der FG 08 Mutterstadt</Heading>
                    {// Make image Responsive 
                    }
                    <Image src="./teamlogo.png" fit="contain"/>
                    <Link to="./Hygienekonzept.pdf" target="_blank" download>
                        <Button primary label="Unser Hygenekonzept Herunterladen" icon={<Download />}/>
                    </Link>
                </Box>
                <Box pad="large">
                    <Heading level="2" textAlign="center">Nächsten Spieltage</Heading>
                    <Grid gap="medium" rows="small" columns={{ count: "fit", size: "small" }}>
                        <MatchdayCard />
                        <MatchdayCard />
                    </Grid>
                </Box>
                <Button secondary label="Alle Spieltage Ansehen"></Button>
            </Box>
        )
    }
}

export default HomePage; 