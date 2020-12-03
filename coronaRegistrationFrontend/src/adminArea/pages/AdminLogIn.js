import React from "react"
import { Box, TextInput, FormField, Button, Heading } from "grommet"
import AnchorAppBar from "../../reuseComponents/AnchorAppBar"

class AdminLogIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <>
                <AnchorAppBar s_title="Mitarbeiterbereich"/>
                <Box align="center" pad="small">
                    <Heading level="3">Login</Heading>
                    <FormField label="Benutzername">
                        <TextInput/>
                    </FormField>
                    <FormField label="Passwort">
                        <TextInput type="password" />
                    </FormField>
                    <Button primary label="Einloggen" />
                </Box>
            </>
        )
    }
}
export default AdminLogIn; 