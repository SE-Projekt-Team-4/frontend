import React from "react";
import { Form, FormField, MaskedInput, TextInput, Heading, Box, Button } from "grommet";
import { FormNext, MailOption, Phone } from "grommet-icons";

const o_emailMask = [
  {
    regexp: /^[\w\-_.]+$/,
    placeholder: "example",
  },
  { fixed: "@" },
  {
    regexp: /^[\w]+$/,
    placeholder: "my",
  },
  { fixed: "." },
  {
    regexp: /^[\w]+$/,
    placeholder: "com",
  },
];

const o_telNrMask = [
  { fixed: "+" },
  {
    regexp: /^[0-9]{1,3}$/,
    placeholder: "xxx"
  },
  { fixed: " " },
  {
    length: 12,
    regexp: /^[0-9]{1,12}$/,
    placeholder: "xxxxxxxxxxxx",
  },
];

const o_formValidationMessages = {
  invalid: "Ungültig", 
  required: "Erforderlich"
}

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      surname: "",
      street: "",
      houseNr: "",
      city: "",
      postcode: "",
      email: "",
      telNr: ""
    };

    this.resetValues = this.resetValues.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.baseState = this.state;
  }

  resetValues() {
    this.setState({
      ...this.baseState
    })
  }

  handleInputChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <Form onReset={this.resetValues} messages={o_formValidationMessages}>
        <Heading level="3">Adressinformation</Heading>
        <FormField required={true} label="Vorname" name="firstName">
          <TextInput name="firstName" value={this.state.firstName} onChange={this.handleInputChange} placeholder="Max" />
        </FormField>
        <FormField required={true} label="Nachname" name="surname">
          <TextInput name="surname" value={this.state.surname} onChange={this.handleInputChange} placeholder="Mustermann" />
        </FormField>
        <Box direction="row" gap="large">
          <Box width="40%">
            <FormField required={true} label="Straße" name="street">
              <TextInput name="street" value={this.state.street} onChange={this.handleInputChange} placeholder="Musterstraße" />
            </FormField>
          </Box>
          <FormField required={true} label="Hausnummer" name="houseNr">
            <TextInput name="houseNr" value={this.state.houseNr} onChange={this.handleInputChange} placeholder="1" />
          </FormField>
        </Box>
        <Box direction="row" gap="large">
          <Box width="40%">
            <FormField required={true} label="Stadt" name="city">
              <TextInput name="city" value={this.state.city} onChange={this.handleInputChange} placeholder="Musterstadt" />
            </FormField>
          </Box>
          <FormField required={true} label="PLZ" name="postcode">
            <TextInput name="postcode" value={this.state.postcode} onChange={this.handleInputChange} placeholder="xxxxx" />
          </FormField>
        </Box>
        <Heading level="3">Kontaktdaten</Heading>
        <FormField required={true} label="E-Mail Adresse" name="email">
          <MaskedInput name="email" icon={<MailOption />} mask={o_emailMask} value={this.state.email} onChange={this.handleInputChange} />
        </FormField>
        <FormField required={true} label="Telefonnummer (für Rückfragen)" name="telNr">
          <MaskedInput name="telNr" icon={<Phone />} mask={o_telNrMask} value={this.state.telNr} onChange={this.handleInputChange} />
        </FormField>
        <Box direction="row" gap="small" margin={{ top: "medium" }}>
          <Button type="reset" label="Zurücksetzen" />
          <Button primary type="submit" label="Weiter" icon={<FormNext />} reverse={true} />
        </Box>
      </Form>
    );
  }
}
export default ContactForm;