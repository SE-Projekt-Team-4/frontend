import React from "react"
import { Box, TextInput, FormField, Button, Heading } from "grommet"
import AnchorAppBar from "../../reuseComponents/AnchorAppBar"

class AdminLogIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            s_username: "",
            s_password: ""
        }
        this.loginAdminUser = this.loginAdminUser.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this); 
        this.clearAuthToken = this.clearAuthToken.bind(this); 
    }

    handleInputChange(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    loginAdminUser() {
        const s_authToken = "Basic " + new Buffer(this.state.s_username + ":" + this.state.s_password).toString("base64"); 
        fetch("api/isAdmin",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": s_authToken
                }
            })
            .then(result => result.json());
    }

    clearAuthToken() {
        //sessionStorage.clear();
    }

    render() {
        return (
            <>
                <AnchorAppBar s_title="Mitarbeiterbereich" f_clearAuthToken={this.clearAuthToken}/>
                <Box align="center" pad="small">
                    <Heading level="3">Login</Heading>
                    <FormField required label="Benutzername" >
                        <TextInput name="s_username" onChange={this.handleInputChange}/>
                    </FormField>
                    <FormField required label="Passwort">
                        <TextInput name="s_password" type="password" onChange={this.handleInputChange}/>
                    </FormField>
                    <Button primary label="Einloggen" onClick={this.loginAdminUser} />
                </Box>
            </>
        )
    }
}
export default AdminLogIn; 