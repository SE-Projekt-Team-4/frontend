import React from "react"
import { Box, Heading, Button } from "grommet";
import { Home } from "grommet-icons";


class AnchorAppBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

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
        background="brand"
        pad={{ left: "medium", right: "small", vertical: "small" }}
        elevation="medium"
        style={{ zIndex: "1" }}
        {...this.props}
      >
        <Heading level="3" margin="none">{s_title}</Heading>
        {b_isNotHome && <Button icon={<Home />} tip="Zurück zur Homepage" href={hrefLink}/>}
      </Box>
    );
  }
}

export default AnchorAppBar;