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
      s_firstName: "",
      s_surname: "",
      s_street: "",
      s_houseNr: "",
      s_city: "",
      s_postcode: "",
      s_email: "",
      s_telNr: "", 
      b_submittedForm: false
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
      <Form onReset={this.resetValues} onSubmit={this.props.onSubmit} messages={o_formValidationMessages}>
        <Heading level="3">Adressinformation</Heading>
        <FormField  label="Vorname" name="firstName">
          <TextInput name="s_firstName" value={this.state.s_firstName} onChange={this.handleInputChange} placeholder="Max" />
        </FormField>
        <FormField  label="Nachname" name="surname">
          <TextInput name="s_surname" value={this.state.s_surname} onChange={this.handleInputChange} placeholder="Mustermann" />
        </FormField>
        <Box direction="row" gap="large">
          <Box width="40%">
            <FormField  label="Straße" name="street">
              <TextInput name="s_street" value={this.state.s_street} onChange={this.handleInputChange} placeholder="Musterstraße" />
            </FormField>
          </Box>
          <FormField  label="Hausnummer" name="houseNr">
            <TextInput name="s_houseNr" value={this.state.s_houseNr} onChange={this.handleInputChange} placeholder="1" />
          </FormField>
        </Box>
        <Box direction="row" gap="large">
          <Box width="40%">
            <FormField  label="Stadt" name="city">
              <TextInput name="s_city" value={this.state.s_city} onChange={this.handleInputChange} placeholder="Musterstadt" />
            </FormField>
          </Box>
          <FormField  label="PLZ" name="postcode">
            <TextInput name="s_postcode" value={this.state.s_postcode} onChange={this.handleInputChange} placeholder="xxxxx" />
          </FormField>
        </Box>
        <Heading level="3">Kontaktdaten</Heading>
        <FormField  label="E-Mail Adresse" name="email">
          <MaskedInput name="s_email" icon={<MailOption />} mask={o_emailMask} value={this.state.s_email} onChange={this.handleInputChange} />
        </FormField>
        <FormField  label="Telefonnummer (für Rückfragen)" name="telNr">
          <MaskedInput name="s_telNr" icon={<Phone />} mask={o_telNrMask} value={this.state.s_telNr} onChange={this.handleInputChange} />
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