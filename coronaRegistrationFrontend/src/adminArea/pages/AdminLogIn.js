import React from "react"
import {  Box, TextInput, FormField, Button } from "grommet"
import AnchorAppBar from "../../reuseComponents/AnchorAppBar"

class AdminLogIn extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
        }
    }
    render() {
        const { b_isAdmin } = this.state;
        return(
            <>
                <AnchorAppBar s_title="Mitarbeiterbereich" />
                <Box >

                    <Box align="center" pad="small">
                        <FormField label="Nutzername">
                            <TextInput placeholder="type here" />
                        </FormField>
                    </Box>

                    <Box align="center" pad="small">
                        <FormField label="Passwort">
                            <TextInput placeholder="type here" />
                        </FormField>
                    </Box>

                    <Box align="center" pad="small">
                        <Button primary label="Einloggen" />
                    </Box>
                </Box>
            </>
        )
    }
}
export default AdminLogIn; 