import React from "react";
import { Box, Heading, Button, Image } from "grommet";
import NextMatchdaysGrid from "../../reuseComponents/NextMatchdaysGrid";
import AnchorAppBar from "../../reuseComponents/AnchorAppBar";
import { Download } from "grommet-icons";
import { Link } from "react-router-dom";
import { getAllMatches } from "../../util/ApiRequests";

/**
 * @class HomePage
 */
class HomePage extends React.Component {

    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            a_matchData: []
        };
    }

    /**
     * Fetches allMatches to show on the home page
     */
    componentDidMount() {
        getAllMatches().then(a_matches => {
            this.setState({
                a_matchData: a_matches.data
            });
        })
    }


    /**
     * Renders the home page for customers
     */
    render() {
        const { a_matchData } = this.state;
        return (
            <>
                <AnchorAppBar s_title="Homepage" />
                <Box direction="column" align="center" justify="center" pad="small" background="url(./footballbackground.jpg)">
                    <Heading level="2" textAlign="center" color="light-1">Wilkommen bei der Terminbuchung der FG 08 Mutterstadt</Heading>
                    <Image src="./teamlogo.png" fill={false} />
                    <Link to="./Hygienekonzept.pdf" target="_blank" download>
                        <Button primary label="Unser Hygenekonzept Herunterladen" icon={<Download />} />
                    </Link>
                </Box>
                {a_matchData &&
                    <NextMatchdaysGrid b_isAdmin={false} a_matchData={a_matchData} />
                }
            </>
        )
    }
}

export default HomePage; 