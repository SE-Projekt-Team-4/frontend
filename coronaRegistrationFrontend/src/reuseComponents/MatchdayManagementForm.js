import React from "react";
import { Layer, Box, Heading, Button, Form, FormField, TextInput, MaskedInput, Calendar, DropButton, Text, RadioButtonGroup } from "grommet";
import { Close, Schedule, FormNext } from "grommet-icons";
import FormButtons from "./FormButtons";

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
const o_today = new Date();
const o_currentDate = new Date(o_today.toISOString());
const s_currentDateISO = o_currentDate.toISOString();
const s_futureDateISO = new Date(o_today.setFullYear(o_today.getFullYear() + 1)).toISOString();
const s_formattedCurrentDate = o_currentDate.getDate() + "." + (o_currentDate.getMonth() + 1) + "." + o_currentDate.getFullYear();
const s_formattedCurrentTime = o_currentDate.toTimeString().substring(0, 5);


class MatchdayManagementForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            s_opponent: this.props.s_opponent,
            s_dateTime: this.props.s_dateTime,
            s_formattedDateTime: "",
            s_date : this.props.s_date,
            s_time : this.props.s_time,
            i_maxSpaces: this.props.i_maxSpaces,
            b_isCancelled: this.props.b_isCancelled,
            b_isDateTimePickerOpen: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.resetValues = this.resetValues.bind(this);
        this.formatDateTime = this.formatDateTime.bind(this);
        this.handleDatePick = this.handleDatePick.bind(this);
        this.submitNewMatchday = this.submitNewMatchday.bind(this);
        this.submitDateTime = this.submitDateTime.bind(this); 
        this.toggleDateTimePicker = this.toggleDateTimePicker.bind(this);
        this.baseState = this.state;
    }

    resetValues() {
        this.setState({
            ...this.baseState
        })
    }

    componentDidMount() {
        if (this.state.s_dateTime) {
            this.formatDateTime(this.state.s_dateTime);
        } else {
            this.setState({
                ...this.state,
                s_formattedDateTime: s_formattedCurrentDate + " um " + s_formattedCurrentTime, 
                s_date: s_currentDateISO
            })
        }
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

    submitDateTime() {
        const { s_date, s_time } = this.state;
        const o_date = new Date(s_date);
        const s_hours = s_time.substring(0, 2);
        const s_minutes = s_time.substring(s_time.length-2); 

        o_date.setHours(parseInt(s_hours), parseInt(s_minutes)); 
        const s_formattedDate = o_date.getDate() + "." + (o_date.getMonth() + 1) + "." + o_date.getFullYear();
        this.setState({
            ...this.state,
            s_formattedDateTime: s_formattedDate + " um " + s_time, 
            s_dateTime: o_date.toISOString(),
            b_isDateTimePickerOpen: false
        })
    }

    submitNewMatchday() {
        //TODO Fix 403 error and trim entries
        //TODO Convert date and time to dateTime
        fetch("/api/matches",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json', 
                    "Authorization": sessionStorage.getItem("s_authToken")
                },
                body: JSON.stringify({
                    "opponent": this.state.s_opponent,
                    "date": this.state.s_dateTime,
                    "maxSpaces": this.state.i_maxSpaces,
                    "isCancelled": this.state.b_isCancelled
                })
            })
            .then(result => result.json());

        this.props.f_closeLayer(); 
    }

    handleDatePick(date) {
        this.setState({
            ...this.state,
            s_date: date
        });
    }

    toggleDateTimePicker() {
        const { b_isDateTimePickerOpen } = this.state;
        if(b_isDateTimePickerOpen) {
            this.setState({
                ...this.state,
                b_isDateTimePickerOpen: false
            });
        } else if(!b_isDateTimePickerOpen){
            this.setState({
                ...this.state,
                b_isDateTimePickerOpen: true
            });
        }
    }

    formatDateTime(date) {
        const o_date = new Date(date);
        const s_formattedDate = o_date.getDate() + "." + (o_date.getMonth() + 1) + "." + o_date.getFullYear();
        const s_time = o_date.toTimeString().substring(0, 5);

        this.setState({
            ...this.state,
            s_formattedDateTime: s_formattedDate + " um " + s_time,
            b_isDateTimePickerOpen: false
        })
    }

    render() {
        const { s_title, f_closeLayer } = this.props;
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
                                    {s_dateTime ?
                                        <Calendar name="s_date" date={s_date} onSelect={this.handleDatePick} firstDayOfWeek={1} showAdjacentDays={false} />
                                        : <Calendar name="s_date" date={s_currentDateISO} bounds={[s_currentDateISO, s_futureDateISO]} onSelect={this.handleDatePick} firstDayOfWeek={1} showAdjacentDays={false} />
                                    }
                                    <MaskedInput name="s_time" dropHeight="small" value={s_time} mask={o_timeMask} onChange={this.handleInputChange} />
                                    <Box direction="row-responsive" justify="end" pad="xsmall">
                                        <Button primary reverse label="Bestätigen" icon={<FormNext />} fill="vertical" gap="xxsmall" disabled={s_formattedCurrentTime.length < 3} onClick={this.submitDateTime}/>
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