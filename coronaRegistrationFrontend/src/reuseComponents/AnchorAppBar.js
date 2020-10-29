import React from "react"
import { Box, Heading } from "grommet";


class AnchorAppBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Box
        tag="header"
        direction="row"
        align="center"
        justify="between"
        background="brand"
        pad={{ left: "medium", right: "small", vertical: "small" }}
        elevation="medium"
        style={{ zIndex: "1" }}
        {...this.props}
      >
        <Heading level="3" margin="none">{this.props.title}</Heading>
      </Box>
    );
  }
}

export default AnchorAppBar;