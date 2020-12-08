import React from "react"
import { Box, TextInput, FormField, Button, Heading, Text } from "grommet"
import AnchorAppBar from "../../reuseComponents/AnchorAppBar"
import { Redirect } from "react-router-dom";

class AdminLogIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            s_username: "",
            s_password: "",
            b_isAuthenticated: false
        }
        this.loginAdminUser = this.loginAdminUser.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": s_authToken
                }
            })
            .then(result => result.json())
            .then((result) => {
                this.setState({
                    ...this.state,
                    b_isAuthenticated: result.data === "Credentials are correct!"
                });
                sessionStorage.setItem("s_authToken", s_authToken);
            });
    }

    render() {
        return (
            <>
                <AnchorAppBar s_title="Mitarbeiterbereich"/>
                <Box align="center" pad="small">
                    <Heading level="3">Login</Heading>
                    <FormField required label="Benutzername" >
                        <TextInput name="s_username" onChange={this.handleInputChange} />
                    </FormField>
                    <FormField required label="Passwort">
                        <TextInput name="s_password" type="password" onChange={this.handleInputChange} />
                    </FormField>
                    <Button primary label="Einloggen" onClick={this.loginAdminUser} />
                    {this.state.b_isAuthenticated &&
                        <Redirect to="/admin" /> }
                </Box>
            </>
        )
    }
}
export default AdminLogIn; 