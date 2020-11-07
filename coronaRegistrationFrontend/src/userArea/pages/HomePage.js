import React from "react";
import { Box, Grid, Heading, Button, Image } from "grommet";
import MatchdayCard from "../../reuseComponents/MatchdayCard";
import AnchorAppBar from "../../reuseComponents/AnchorAppBar";
import { Download } from "grommet-icons";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
    render() {
        return (
            <>
                <AnchorAppBar title="Homepage" />
                <Box direction="column" align="center" justify="center" pad="small" background="url(./footballbackground.jpg)">
                    <Heading level="2" textAlign="center" color="light-1">Wilkommen bei der Terminbuchung der FG 08 Mutterstadt</Heading>
                    <Image src="./teamlogo.png" fill={false} />
                    <Link to="./Hygienekonzept.pdf" target="_blank" download>
                        <Button primary label="Unser Hygenekonzept Herunterladen" icon={<Download />} />
                    </Link>
                </Box>
                <Box direction="column" align="center">
                    <Heading level="2" textAlign="center" margin={{ "bottom": "xsmall" }}>Nächsten Spieltage</Heading>
                </Box>
                <Grid gap="small" justify="center" align="center" columns="medium" rows="medium" pad="medium">
                    <MatchdayCard />
                    <MatchdayCard />
                </Grid>
                <Box pad="medium" direction="column" align="center">
                    <Button secondary active label="Alle Spieltage Ansehen"></Button>
                </Box>
            </>
        )
    }
}

export default HomePage; 