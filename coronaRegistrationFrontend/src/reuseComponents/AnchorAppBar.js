import React from "react"
import { Box, Heading, Button } from "grommet";
import { Home, Logout } from "grommet-icons";

/**
 * @class AnchorAppBar
 * @version 2.1.0
 */
class AnchorAppBar extends React.Component {

  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Renders the anchor bar on top of a page
   */
  render() {
    const { s_title, b_isNotHome, b_isAdmin } = this.props
    let hrefLink = "/"
    if (b_isAdmin) {
      hrefLink = "/admin"
    }
    return (
      <Box
        tag="header"
        direction="row-responsive"
        align="center"
        justify="between"
        fill="horizontal"
        background="brand"
        pad={{ left: "medium", vertical: "small" }}
        elevation="medium"
        style={{ zIndex: "1" }}
        {...this.props}
      >
        <Heading level="3" margin="none">{s_title}</Heading>
        <Box direction="row-responsive">
        {b_isAdmin && <Button icon={<Logout />} href="/login" onClick={this.props.f_clearAuthToken}/>}
        {b_isNotHome && <Button icon={<Home />} tip="Zurück zur Homepage" href={hrefLink} />}
        </Box>
      </Box>
    );
  }
}

export default AnchorAppBar;