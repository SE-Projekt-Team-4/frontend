import React from "react";
import { Form, FormField, MaskedInput, TextInput, Heading } from "grommet";

/* const emailMask = [
    {
      regexp: /^[\w\-_.]+$/,
      placeholder: 'max.mustermann',
    },
    { fixed: '@' },
    {
      regexp: /^[\w]+$/,
      placeholder: 'web',
    },
    { fixed: '.' },
    {
      regexp: /^[\w]+$/,
      placeholder: 'de',
    },
  ]; */

/*   const telNrMask = [
    { fixed: '(' },
    {
      length: 3,
      regexp: /^[0-9]{1,3}$/,
      placeholder: '+49',
    },
    { fixed: ')' },
    { fixed: ' ' },
    {
      length: 3,
      regexp: /^[0-9]{1,3}$/,
      placeholder: 'xxx',
    },
    { fixed: '-' },
    {
      length: 4,
      regexp: /^[0-9]{1,4}$/,
      placeholder: 'xxxx',
    },
  ]; */

class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            surname: "",
            street: "",
            city: "",
            postcode: null,
            email: "",
            telNr: null
        };

        this.resetValues = this.resetValues.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    resetValues() {
    }

    handleInputChange(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <Form onReset={() => this.resetValues}>
                <Heading level="3">Adressinformation</Heading>
                <FormField required={true} label="Vorname" name="firstName">
                    <TextInput name="firstName" value={this.state.firstName} onChange={this.handleInputChange} />
                </FormField>
                <FormField label="Nachname" name="surname">
                    <TextInput name="surname" value={this.state.surname} onChange={this.handleInputChange} />
                </FormField>
                <FormField label="Straße inkl. Hausnummer" name="street">
                    <TextInput name="street" value={this.state.street} onChange={this.handleInputChange} />
                </FormField>
                <FormField label="Stadt" name="city">
                    <TextInput name="city" value={this.state.city} onChange={this.handleInputChange} />
                </FormField>
                <FormField label="PLZ" name="postcode">
                    <TextInput name="postcode" value={this.state.postcode} onChange={this.handleInputChange} />
                </FormField>
                <Heading level="3">Kontaktdaten</Heading>
                <FormField label="E-Mail Adresse" name="email">
                    <TextInput name="email" value={this.state.email} onChange={this.handleInputChange} />
                </FormField>
                <FormField label="Telefonnummer (für Rückfragen)" name="telNr">
                    <TextInput name="telNr" value={this.state.telNr} onChange={this.handleInputChange} />
                </FormField>


            </Form>);
    }
}
export default ContactForm;