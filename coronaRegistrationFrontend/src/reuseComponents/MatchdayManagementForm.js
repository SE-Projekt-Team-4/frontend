import React from "react";
import { Layer, Box, Heading, Button, Form, FormField, TextInput, MaskedInput, Calendar, DropButton, Text, RadioButtonGroup } from "grommet";
import { Close, Schedule, FormNext } from "grommet-icons";
import FormButtons from "./FormButtons";

const o_timeMask = [
    {
        length: [1, 2],
        options: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
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

const o_maxSpacesMask = [
    {
        regexp: /^[0-9]*$/,
        placeholder: "200"
    }
]

const o_formValidationMessages = {
    invalid: "Ungültig",
    required: "Erforderlich"
}

class MatchdayManagementForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            s_opponent: this.props.s_opponent,
            s_dateTime: this.props.s_dateTime,
            s_maxSpaces: this.props.s_maxSpaces,
            b_isCancelled: this.props.b_isCancelled,
            s_date: "",
            s_time: "",
            b_isDateTimePickerOpen: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.resetValues = this.resetValues.bind(this);
        this.formatDateTime = this.formatDateTime.bind(this);
        this.openDateTimePicker = this.openDateTimePicker.bind(this);
        this.handleDatePick = this.handleDatePick.bind(this);
        this.submitNewMatchday = this.submitNewMatchday.bind(this);
        this.baseState = this.state;
    }

    resetValues() {
        this.setState({
            ...this.baseState
        })
    }

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

    submitNewMatchday() {
        //TODO Fix 403 error
        fetch("/api/matches",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "opponent": this.state.s_opponent,
                    "dateTime": this.state.s_dateTime,
                    "maxSpaces": this.state.s_maxSpaces,
                    "isCancelled": this.state.b_isCancelled
                })
            })
            .then(result => result.json());
    }

    handleDatePick(date) {
        this.setState({
            ...this.state,
            s_date: date
        });
    }

    openDateTimePicker() {
        this.setState({
            ...this.state,
            b_isDateTimePickerOpen: true
        })
    }

    formatDateTime(date, time) {
        const o_date = new Date(date);
        const s_formattedDate = o_date.getDate() + "." + (o_date.getMonth() + 1) + "." + o_date.getFullYear();

        this.setState({
            ...this.state,
            s_dateTime: s_formattedDate + " um " + time,
            b_isDateTimePickerOpen: false
        })
    }

    render() {
        const { s_title, f_closeLayer } = this.props;
        const { s_opponent, s_dateTime, s_maxSpaces, b_isCancelled, s_date, s_time, b_isDateTimePickerOpen } = this.state;
        const s_currentDate = new Date().toISOString();
        const s_currentTime = new Date().getHours() + ":" + new Date().getMinutes();
        const s_futureDate = new Date();
        s_futureDate.setFullYear(s_futureDate.getFullYear() + 1);
        return (
            <Layer position="center">
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
                            <DropButton open={b_isDateTimePickerOpen} onOpen={this.openDateTimePicker} dropContent={
                                <Box pad="medium" >
                                    <Calendar name="s_date" date={s_date ? s_date : s_currentDate} bounds={[s_currentDate, s_futureDate]} onSelect={this.handleDatePick} firstDayOfWeek={1} showAdjacentDays={false} />
                                    <MaskedInput name="s_time" dropHeight="small" mask={o_timeMask} value={s_time} onChange={this.handleInputChange} />
                                    <Box direction="row-responsive" justify="end" margin={{ top: "small" }}>
                                        <Button primary reverse label="Bestätigen" icon={<FormNext />} gap="xxsmall" disabled={s_time.length < 3} onClick={(date, time) => this.formatDateTime((s_date || s_currentDate), s_time)} />
                                    </Box>
                                </Box>
                            }>
                                <Box pad="small" gap="medium" direction="row-responsive" justify="between">
                                    <Text color={s_dateTime ? undefined : "#AAAAAA"} weight="bold">{s_dateTime ? s_dateTime : this.formatDateTime(s_currentDate, s_currentTime)}</Text>
                                    <Schedule />
                                </Box>
                            </DropButton>
                        </FormField>

                        <FormField required label="Verfügbare Plätze" name="s_maxSpaces">
                            <MaskedInput name="s_maxSpaces" mask={o_maxSpacesMask} value={s_maxSpaces} onChange={this.handleInputChange} />
                        </FormField>
                        <FormField label="Status" name="b_isCancelled">
                            <RadioButtonGroup name="b_isCancelled" value={b_isCancelled ? b_isCancelled : false} onChange={this.handleInputChange} options={[
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