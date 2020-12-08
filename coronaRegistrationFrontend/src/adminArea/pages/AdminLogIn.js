import React from "react"
import ReactDOM from "react-dom"
import { Box, TextInput, FormField, Button, Heading, Text } from "grommet"
import AnchorAppBar from "../../reuseComponents/AnchorAppBar"
import { Redirect } from "react-router-dom";

class AdminLogIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            s_username: "",
            s_password: ""
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
                //TODO add error handling
                //set state must be called in a seperate function due to its asynchronous nature i.e. state will only be updated once the surrounding function has finished executing. 
                //as we don't want to set the token before setting state which would cause unwanted auth bugs
                if (result.data === "Credentials are correct!") {
                    sessionStorage.setItem("s_authToken", s_authToken);
                    window.location.replace("/admin");
                }
            });
    }

    render() {
        return (
            <>
                <AnchorAppBar s_title="Mitarbeiterbereich" />
                <Box align="center" pad="small">
                    <Heading level="3">Login</Heading>
                    <FormField required label="Benutzername" >
                        <TextInput name="s_username" onChange={this.handleInputChange} />
                    </FormField>
                    <FormField required label="Passwort">
                        <TextInput name="s_password" type="password" onChange={this.handleInputChange} />
                    </FormField>
                    <Button primary label="Einloggen" onClick={this.loginAdminUser} />
                    {/* {sessionStorage.getItem("s_authToken") && <Redirect from="/login" to="/admin"/>} */}
                </Box>
            </>
        )
    }
}
export default AdminLogIn; 