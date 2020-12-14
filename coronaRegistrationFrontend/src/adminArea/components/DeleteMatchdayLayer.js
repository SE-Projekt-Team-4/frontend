import React from "react"
import { Heading, Box, Layer, Text, Button } from "grommet"

class DeleteMatchdayLayer extends React.Component {

    render() {
        const { f_onCloseLayer, f_onDeleteMatchday } = this.props;
        return (
            <Layer onClickOutside={f_onCloseLayer}>
                <Box direction="column" pad="small" justify="center" align="center" gap="medium">
                    <Heading align="center" margin="none" level="4">Wollen Sie wirklich diesen Spieltag Löschen?</Heading>
                    <Text size="medium">Hierdurch gehen alle bestehenden Buchungen dieses Spieltags verloren</Text>
                </Box>
                <Box direction="row-responsive" justify="center" pad="small" gap="small">
                    <Button label="Zurück" onClick={f_onCloseLayer} />
                    <Button primary label="Löschen" onClick={f_onDeleteMatchday} />
                </Box>
            </Layer>
        )
    }
}

export default DeleteMatchdayLayer;