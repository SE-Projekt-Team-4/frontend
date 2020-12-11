import React from "react";
import { Form, FormField, MaskedInput, TextInput, Heading, Box, Select } from "grommet";
import { MailOption } from "grommet-icons";
import countryList from "react-select-country-list";
import { postcodeValidator, postcodeValidatorExistsForCountry } from "postcode-validator";
import FormButtons from "../../reuseComponents/FormButtons"; 
import { checkRegex } from "../../util/Helpers";

const o_telNrMask = [
  { fixed: "+" },
  {
    regexp: /^[0-9]{1,3}$/,
    placeholder: "49"
  },
  {
    regexp: /^[0-9]{1,12}$/,
    placeholder: "123456789123",
  },
];

const o_formValidationMessages = {
  invalid: "Ungültig",
  required: "Erforderlich"
}

const o_validationRegExps = {
  s_name: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð'-]+$/,
  s_city: /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/,
  s_houseNr: /^(?!0)\d[0-9a-zA-Z-/ ]*$/,
  s_notEmptyString: /^(?!\s*$).+/,
  s_email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  s_telNr: /^[+0-9]{8,15}$/
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
    this.validatePostcode = this.validatePostcode.bind(this);
    this.checkRegexValidity = this.checkRegexValidity.bind(this);
    this.baseState = this.state;
  }

  resetValues() {
    this.setState({
      ...this.baseState
    })
  }

  checkRegexValidity(regexp, value) {
    return checkRegex(regexp, value); 
    /* if (value) {
      value = value.trim();
      const o_Regex = new RegExp(regexp)
      if (!o_Regex.test(value)) {
        return o_formValidationMessages.invalid;
      }
    } */
  }

  validatePostcode(postcode) {
    const { s_country } = this.state;
    if (postcode && s_country) {
      const s_countryCode = s_country.value; 
      if (s_country && postcodeValidatorExistsForCountry(s_countryCode)) {
        if (!postcodeValidator(postcode, s_countryCode)) {
          return o_formValidationMessages.invalid;
        }
      }
    }
  }

  handleInputChange(event) {
    if (event.target.name === "s_country") {
      this.setState({
        ...this.state,
        s_country: event.option
      }); 
      this.validatePostcode(this.state.s_postcode)
    } else {
      this.setState({
        ...this.state,
        [event.target.name]: event.target.value
      });
    }
  }

  render() {
    const { s_firstName, s_surname, s_street, s_houseNr, s_city, s_postcode, s_email, s_telNr, s_country, a_suggestions } = this.state;
    return (
      <Form onReset={this.resetValues} onSubmit={this.props.onSubmit} messages={o_formValidationMessages} validate="blur">
        <Heading level="3">Adressinformation</Heading>
        <FormField required label="Vorname" name="s_firstName" validate={(event) => this.checkRegexValidity(o_validationRegExps.s_name, event)}>
          <TextInput name="s_firstName" value={s_firstName} onChange={this.handleInputChange} placeholder="Max" />
        </FormField>
        <FormField required label="Nachname" name="s_surname" validate={(event) => this.checkRegexValidity(o_validationRegExps.s_name, event)}>
          <TextInput name="s_surname" value={s_surname} onChange={this.handleInputChange} placeholder="Mustermann" />
        </FormField>
        <Box direction="row-responsive" gap="medium">
          <FormField required width="60%" label="Straße" name="s_street" validate={(event) => this.checkRegexValidity(o_validationRegExps.s_notEmptyString, event)}>
            <TextInput name="s_street" value={s_street} onChange={this.handleInputChange} placeholder="Musterstraße" />
          </FormField>
          <FormField required width="40%" label="Hausnummer" name="s_houseNr" validate={(event) => this.checkRegexValidity(o_validationRegExps.s_houseNr, event)}>
            <TextInput name="s_houseNr" value={s_houseNr} onChange={this.handleInputChange} placeholder="1" />
          </FormField>
        </Box>
        <Box direction="row-responsive" gap="medium">
          <FormField required width="60%" label="Stadt" name="s_city" validate={(event) => this.checkRegexValidity(o_validationRegExps.s_city, event)}>
            <TextInput name="s_city" value={s_city} onChange={this.handleInputChange} placeholder="Musterstadt" />
          </FormField>
          <FormField required width="40%" label="PLZ" name="s_postcode" validate={this.validatePostcode}>
            <TextInput name="s_postcode" value={s_postcode} onChange={this.handleInputChange} placeholder="12345" />
          </FormField>
        </Box>
        <FormField required label="Land" name="s_country">
          <Select name="s_country" value={s_country} onChange={this.handleInputChange} options={a_suggestions} replace={false} valueKey="value" labelKey="label" dropHeight="medium" placeholder="Germany" />
        </FormField>
        <Heading level="3">Kontaktdaten</Heading>
        <FormField required label="E-Mail Adresse" name="s_email" validate={(event) => this.checkRegexValidity(o_validationRegExps.s_email, event)}>
          <TextInput name="s_email" icon={<MailOption />} value={s_email} onChange={this.handleInputChange} placeholder="example@my.com" />
        </FormField>
        <FormField required label="Telefonnummer (inkl. Vorwahl)" name="s_telNr" validate={(event) => this.checkRegexValidity(o_validationRegExps.s_telNr, event)}>
          <MaskedInput name="s_telNr" value={s_telNr} mask={o_telNrMask} onChange={this.handleInputChange} />
        </FormField>
        <FormButtons/>
      </Form>
    );
  }
}
export default ContactForm;