import React from "react";
import { Form, FormField, MaskedInput, TextInput, Heading, Box, Button } from "grommet";
import { FormNext, MailOption, Phone } from "grommet-icons";
import countryList from "react-select-country-list";
import { postcodeValidator, postcodeValidatorExistsForCountry } from "postcode-validator";

const o_emailMask = [
  {
    regexp: /^[^\s@]+$/,
    placeholder: "example",
  },
  {
    regexp: /^@[^\s@]+$/,
    placeholder: "@my",
  },
  {
    regexp: /^\.[^\s@]+$/,
    placeholder: ".com",
    length: 24
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

const o_validationRegExps = {
  name: "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð'-]+$", 
  city: "^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$"

}

class ContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      s_firstName: this.props.o_formData.s_firstName,
      s_surname: this.props.o_formData.s_surname,
      s_street: this.props.o_formData.s_street,
      s_houseNr: this.props.o_formData.s_houseNr,
      s_city: this.props.o_formData.s_city,
      s_postcode: this.props.o_formData.s_postcode,
      s_country: this.props.o_formData.s_country,
      s_email: this.props.o_formData.s_email,
      s_telNr: this.props.o_formData.s_telNr,
      b_submittedForm: false,
      a_suggestions: countryList().getData()
    };

    this.resetValues = this.resetValues.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.validatePostcode = this.validatePostcode.bind(this);
    this.validateCity = this.validateCity.bind(this);
    this.trimWhitespaces = this.trimWhitespaces.bind(this);
    this.checkRegexValidity = this.checkRegexValidity.bind(this);
    this.validateNames = this.validateNames.bind(this);
    this.baseState = this.state;
  }

  resetValues() {
    this.setState({
      ...this.baseState
    })
  }

  selectCountry(event) {
    this.setState({
      ...this.state,
      s_country: event.suggestion.label
    });
  }

  trimWhitespaces(value) {
    return value.trim();
  }

  checkRegexValidity(regexp, value) {
    if (!regexp.test(value)) {
      return o_formValidationMessages.invalid;
    }
  }

  validateNames(name) {
    if (name) {
      name = this.trimWhitespaces(name);
      const nameRegExp = new RegExp(o_validationRegExps.name);
      this.checkRegexValidity(nameRegExp, name);
    }
  }

  validatePostcode(postcode) {
    if (postcode) {
      const { s_country } = this.state;
      const s_countryCode = countryList().getValue(s_country)
      if (s_country && postcodeValidatorExistsForCountry(s_countryCode)) {
        if (!postcodeValidator(postcode, s_countryCode)) {
          return o_formValidationMessages.invalid;
        }
      }
    }
  }

  validateCity(cityName) {
    if (cityName) {
      const cityRegExp = new RegExp(o_validationRegExps.city)
      return this.checkRegexValidity(cityRegExp, cityName)
    }
  }

  handleInputChange(event) {
    if (event.target.name !== "s_country") {
      this.setState({
        ...this.state,
        [event.target.name]: event.target.value
      });
    } else {
      const s_escapedText = event.target.value.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
      const o_regex = new RegExp(s_escapedText, "i");
      const a_countryList = countryList().getData();
      const a_newSuggestions = a_countryList.filter(o_suggestion => o_regex.test(o_suggestion.label));
      this.setState({
        ...this.state,
        a_suggestions: a_newSuggestions,
        s_country: event.target.value
      })
    }
  }

  render() {
    const { s_firstName, s_surname, s_street, s_houseNr, s_city, s_postcode, s_email, s_telNr, s_country, a_suggestions } = this.state;
    return (
      <Form onReset={this.resetValues} onSubmit={this.props.onSubmit} messages={o_formValidationMessages}>
        <Heading level="3">Adressinformation</Heading>
        <FormField required label="Vorname" name="s_firstName" validate={this.validateNames}>
          <TextInput name="s_firstName" value={s_firstName} onChange={this.handleInputChange} placeholder="Max" />
        </FormField>
        <FormField label="Nachname" name="s_surname" validate={this.validateNames}>
          <TextInput name="s_surname" value={s_surname} onChange={this.handleInputChange} placeholder="Mustermann" />
        </FormField>
        <Box direction="row-responsive" gap="medium">
          <FormField width="60%" label="Straße" name="s_street">
            <TextInput name="s_street" value={s_street} onChange={this.handleInputChange} placeholder="Musterstraße" />
          </FormField>
          <FormField width="40%" label="Hausnummer" name="s_houseNr">
            <TextInput name="s_houseNr" value={s_houseNr} onChange={this.handleInputChange} placeholder="1" />
          </FormField>
        </Box>
        <Box direction="row-responsive" gap="medium">
          <FormField required width="60%" label="Stadt" name="s_city" validate={this.validateCity}>
            <TextInput name="s_city" value={s_city} onChange={this.handleInputChange} placeholder="Musterstadt" />
          </FormField>
          <FormField required width="40%" label="PLZ" name="s_postcode" validate={this.validatePostcode}>
            <TextInput name="s_postcode" value={s_postcode} onChange={this.handleInputChange} placeholder="12345" />
          </FormField>
        </Box>
        <FormField required label="Land" name="s_country">
          <TextInput name="s_country" value={s_country} onChange={this.handleInputChange} onSelect={this.selectCountry} suggestions={a_suggestions} placeholder="Germany" />
        </FormField>
        <Heading level="3">Kontaktdaten</Heading>
        <FormField label="E-Mail Adresse" name="s_email">
          <MaskedInput name="s_email" icon={<MailOption />} mask={o_emailMask} value={s_email} onChange={this.handleInputChange} />
        </FormField>
        <FormField label="Telefonnummer" name="s_telNr">
          <MaskedInput name="s_telNr" icon={<Phone />} mask={o_telNrMask} value={s_telNr} onChange={this.handleInputChange} />
        </FormField>
        <Box direction="row-responsive" gap="small" margin={{ top: "medium" }}>
          <Button type="reset" label="Zurücksetzen" />
          <Button primary type="submit" label="Weiter" icon={<FormNext />} reverse={true} gap="xxsmall" />
        </Box>
      </Form>
    );
  }
}
export default ContactForm;