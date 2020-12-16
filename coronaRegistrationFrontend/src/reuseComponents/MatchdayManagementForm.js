import React from "react";
import { Layer, Box, Heading, Button, Form, FormField, TextInput, MaskedInput, Calendar, DropButton, Text, RadioButtonGroup } from "grommet";
import { Close, Schedule, FormNext, Clock } from "grommet-icons";
import FormButtons from "./FormButtons";
import { postNewMatch, putExistingMatch } from "../util/ApiRequests";
import { formatDateTime, trimFormData } from "../util/Helpers";
/**
 * this regexp fixes the inputs for the matchday time to (00:00-23:59)
 */
const o_timeMask = [
    {
        length: [1, 2],
        options: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
        regexp: /^1[1-2]$|^[0-9]$/,
        placeholder: "ss",
    },
    { fixed: ":" },
    {
        length: 2,
        options: ["00", "15", "30", "45"],
        regexp: /^[0-5][0-9]$|^[0-9]$/,
        placeholder: "mm",
    }
];

/**
 * this regexp only allows numbers to be inserted into the maximum places
 */
const o_maxSpacesMask = [
    {
        regexp: /^[0-9]*$/,
        placeholder: "200"
    }
]

/**
 * defines the messages for an invalid or a required input
 */
const o_formValidationMessages = {
    invalid: "Ungültig",
    required: "Erforderlich"
}
const o_today = new Date();
const o_currentDate = new Date(o_today.toISOString());
const s_futureDateISO = new Date(o_today.setFullYear(o_today.getFullYear() + 1)).toISOString();
const s_formattedCurrentTime = o_currentDate.toTimeString().substring(0, 5);

/**
 * @class MatchdayManagementForm
 */
class MatchdayManagementForm extends React.Component {
    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            s_opponent: this.props.s_opponent,
            s_dateTime: this.props.s_dateTime,
            s_formattedDateTime: "",
            s_date: this.props.s_date,
            s_time: this.props.s_time,
            i_maxSpaces: this.props.i_maxSpaces,
            b_isCancelled: this.props.b_isCancelled === undefined ? false : this.props.b_isCancelled,
            b_isDateTimePickerOpen: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.resetValues = this.resetValues.bind(this);
        this.formatDateTimeInput = this.formatDateTimeInput.bind(this);
        this.handleDatePick = this.handleDatePick.bind(this);
        this.submitNewMatchday = this.submitNewMatchday.bind(this);
        this.submitDateTime = this.submitDateTime.bind(this);
        this.toggleDateTimePicker = this.toggleDateTimePicker.bind(this);
        this.baseState = this.state;
    }

    /**
     * Resets the inputs in the matchday form
     */
    resetValues() {
        this.setState({
            ...this.baseState
        })
    }

    /**
     * Formats and sets the date and time for the matchday
     */
    componentDidMount() {
        if (this.state.s_dateTime) {
            this.formatDateTimeInput(this.state.s_dateTime);
        } else {
            this.submitDateTime();
        }
    }

    /**
     * Updates the corresponding variables when changing an input
     * @param {Object} event contains meta data for the input change
     */
    handleInputChange(event) {
        if (event.target.name === "b_isCancelled") {
            this.setState({
                ...this.state,
                [event.target.name]: event.target.value === "true"
            });
        } else {
            this.setState({
                ...this.state,
                [event.target.name]: event.target.value
            });
        }
    }

    /**
     * Converts the Date and time input back to ISOString and submits it to the matchday data
     */

    submitDateTime() {
        const { s_date, s_time } = this.state;
        let s_hours;
        let s_minutes;
        let o_date;
        if (!s_time) {
            s_hours = s_formattedCurrentTime.substring(0, 2);
            s_minutes = s_formattedCurrentTime.substring(s_formattedCurrentTime.length - 2);
        } else {
            s_hours = s_time.substring(0, 2);
            s_minutes = s_time.substring(s_time.length - 2);
        }
        if (!s_date) {
            o_date = new Date();
        } else {
            o_date = new Date(s_date);
        }
        const s_formattedDate = o_date.getDate() + "." + (o_date.getMonth() + 1) + "." + o_date.getFullYear();
        const s_formattedTime = s_hours + ":" + s_minutes;
        o_date.setHours(parseInt(s_hours), parseInt(s_minutes));
        
        this.setState({
            ...this.state,
            s_formattedDateTime: s_formattedDate + " um " + s_formattedTime,
            s_dateTime: o_date.toISOString(),
            s_date: o_date.toISOString(),
            s_time: s_formattedTime,
            b_isDateTimePickerOpen: false
        })
    }

    /**
     * Submits a newly created matchday using the data from the from
     */
    submitNewMatchday() {
        const { s_opponent, s_dateTime, i_maxSpaces, b_isCancelled } = this.state;
        const { i_matchId, f_passMatchdayDataToParent, f_closeLayer, b_isEditingExistingMatchday } = this.props;
        const o_matchData = trimFormData({
            s_opponent: s_opponent,
            s_dateTime: s_dateTime,
            i_maxSpaces: i_maxSpaces, 
            b_isCancelled: b_isCancelled
        });

        if (b_isEditingExistingMatchday) {
            putExistingMatch(o_matchData, i_matchId);
        } else {
            postNewMatch(o_matchData);
        }
        f_closeLayer();
        f_passMatchdayDataToParent();
    }


    /**
     * Updates the corresponding variables when changing the date using the DateTimePicker
     * @param {String} date contains the date that was entered
     */
    handleDatePick(date) {
        this.setState({
            ...this.state,
            s_date: date
        });
    }

    /**
     * Opens/Closes the date and time picking option
     */

    toggleDateTimePicker() {
        const { b_isDateTimePickerOpen } = this.state;
        if (b_isDateTimePickerOpen) {
            this.setState({
                ...this.state,
                b_isDateTimePickerOpen: false
            });
        } else if (!b_isDateTimePickerOpen) {
            this.setState({
                ...this.state,
                b_isDateTimePickerOpen: true
            });
        }
    }

    /**
     * Formats the DateAndTime input
     * @param {String} date contains the date that was entered
     */
    formatDateTimeInput(date) {
        const o_date = formatDateTime(date); 
        this.setState({
            ...this.state,
            s_formattedDateTime: o_date.s_formattedDate + o_date.s_time,
            b_isDateTimePickerOpen: false, 
            s_date: date, 
            s_time: o_date.s_time.substring(4)
        })
    }

    /**
     * Renders the MatchdayManagementForm that is used to create a new or change an existing matchday
     */
    render() {
        const { s_title, f_closeLayer, b_isEditingExistingMatchday } = this.props;
        const { s_opponent, s_dateTime, i_maxSpaces, b_isCancelled, b_isDateTimePickerOpen, s_formattedDateTime, s_time, s_date } = this.state;
        return (
            <Layer position="center" onClickOutside={f_closeLayer}>
                <Box direction="row-responsive" align="center" justify="between" pad={{ "right": "medium", "top": "small", "left": "medium" }}>
                    <Heading level="3" margin={{ "right": "xlarge" }}>{s_title}</Heading>
                    <Button icon={<Close />} onClick={f_closeLayer} />
                </Box>
                <Box direction="column" pad={{ "left": "medium", "right": "medium", "bottom": "medium" }}>
                    <Form onReset={this.resetValues} onSubmit={this.submitNewMatchday} messages={o_formValidationMessages} validate="blur">
                        <FormField required label="Gegner" name="s_opponent">
                            <TextInput name="s_opponent" value={s_opponent} onChange={this.handleInputChange} placeholder="TSG Hoffenheim" />
                        </FormField>
                        <FormField name="s_dateTime" label="Datum und Uhrzeit">
                            <DropButton open={b_isDateTimePickerOpen} onClose={this.toggleDateTimePicker} onOpen={this.toggleDateTimePicker} overflow="scroll" dropContent={
                                <Box pad="small">
                                    <Calendar name="s_date" date={s_date} bounds={!b_isEditingExistingMatchday && [s_dateTime, s_futureDateISO]} onSelect={this.handleDatePick} firstDayOfWeek={1} showAdjacentDays={false} />
                                    <MaskedInput name="s_time" icon={<Clock />} dropHeight="small" value={s_time} mask={o_timeMask} onChange={this.handleInputChange} />
                                    <Box direction="row-responsive" justify="end" pad="xsmall">
                                        <Button primary reverse label="Bestätigen" icon={<FormNext />} fill="vertical" gap="xxsmall" disabled={s_formattedCurrentTime.length < 3} onClick={this.submitDateTime} />
                                    </Box>
                                </Box>
                            }>
                                <Box pad="small" gap="medium" direction="row-responsive" justify="between">
                                    <Text weight="bold">{s_formattedDateTime}</Text>
                                    <Schedule />
                                </Box>
                            </DropButton>
                        </FormField>
                        <FormField required label="Verfügbare Plätze" name="i_maxSpaces">
                            <MaskedInput name="i_maxSpaces" mask={o_maxSpacesMask} value={i_maxSpaces} onChange={this.handleInputChange} />
                        </FormField>
                        <FormField label="Status" name="b_isCancelled">
                            <RadioButtonGroup name="b_isCancelled" value={b_isCancelled} onChange={this.handleInputChange} options={[
                                { label: "Findet statt", value: false },
                                { label: "Fällt aus", value: true }
                            ]}
                            />
                        </FormField>
                        <FormButtons />
                    </Form>
                </Box>
            </Layer>
        )
    }
}

export default MatchdayManagementForm; 