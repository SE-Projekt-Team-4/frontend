import React from "react"
import { Box, TextInput, FormField, Button, Heading, Text } from "grommet";
import AnchorAppBar from "../../reuseComponents/AnchorAppBar";
import { getLogin } from "../../util/ApiRequests";
/**
 * @class AdminLogIn
 * @version 3.2.2
 */
class AdminLogIn extends React.Component {

    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            s_username: "",
            s_password: "",
            b_hasEnteredWrongCredentials: false
        }
        this.loginAdminUser = this.loginAdminUser.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    /**
     * When an input is changed, updates the matching attributes
     * @param {Object} event contains meta data for the input change
     */
    handleInputChange(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    /**
     * Attempts to log in an admin user using an authentication token
     */
    loginAdminUser() {
        getLogin(this.state.s_username, this.state.s_password).then(o_response => {
            if (o_response.result.data === "Success") {
                sessionStorage.setItem("s_authToken", o_response.s_authToken);
                window.location.replace("/admin");
            } else {
                this.setState({
                    ...this.state,
                    b_hasEnteredWrongCredentials: true
                })
            }
        })
    }
    /**
     * Renders the admin login page
     */
    render() {
        return (
            <>
                <AnchorAppBar s_title="Mitarbeiterbereich" />
                <Box align="center" pad="small">
                    <Heading level="3">Login</Heading>
                    {this.state.b_hasEnteredWrongCredentials &&
                        <Box round background={{ "color": "status-error", "opacity": "weak" }} pad="small" border>
                            <Text color="status-error">Es wurde ein falscher Benutzername oder ein falsches Passwort eingegeben!</Text>
                        </Box>}
                    <FormField required label="Benutzername" >
                        <TextInput name="s_username" onChange={this.handleInputChange} />
                    </FormField>
                    <FormField required label="Passwort">
                        <TextInput name="s_password" type="password" onChange={this.handleInputChange} />
                    </FormField>
                    <Button primary label="Einloggen" onClick={this.loginAdminUser} />
                </Box>
            </>
        )
    }
}
export default AdminLogIn; 