import React from "react";
import { Form, FormField, MaskedInput, TextInput, Heading, Box } from "grommet";
import { MailOption, Phone } from "grommet-icons";

const emailMask = [
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

const telNrMask = [
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
          <TextInput name="firstName" value={this.state.firstName} onChange={this.handleInputChange} placeholder="Max" />
        </FormField>
        <FormField label="Nachname" name="surname">
          <TextInput name="surname" value={this.state.surname} onChange={this.handleInputChange} placeholder="Mustermann" />
        </FormField>
        <Box direction="row" gap="large">
          <Box width="40%">
            <FormField label="Straße" name="street">
              <TextInput name="street" value={this.state.street} onChange={this.handleInputChange} placeholder="Musterstraße" />
            </FormField>
          </Box>
          <FormField label="Hausnummer" name="houseNr">
            <TextInput name="houseNr" value={this.state.houseNr} onChange={this.handleInputChange} placeholder="1" />
          </FormField>
        </Box>
        <Box direction="row" gap="large">
          <Box width="40%">
            <FormField label="Stadt" name="city">
              <TextInput name="city" value={this.state.city} onChange={this.handleInputChange} placeholder="Musterstadt" />
            </FormField>
          </Box>
          <FormField label="PLZ" name="postcode">
            <TextInput name="postcode" value={this.state.postcode} onChange={this.handleInputChange} placeholder="xxxxx" />
          </FormField>
        </Box>
        <Heading level="3">Kontaktdaten</Heading>
        <FormField label="E-Mail Adresse" name="email">
          <MaskedInput name="email" icon={<MailOption />} mask={emailMask} value={this.state.email} onChange={this.handleInputChange} />
        </FormField>
        <FormField label="Telefonnummer (für Rückfragen)" name="telNr">
          <MaskedInput name="telNr" icon={<Phone />} mask={telNrMask} value={this.state.telNr} onChange={this.handleInputChange} />
        </FormField>
      </Form>
    );
  }
}
export default ContactForm;