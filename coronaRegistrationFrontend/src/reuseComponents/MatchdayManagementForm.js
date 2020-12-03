import React from "react";
import { Layer, Box, Heading, Button, Form, FormField, TextInput, MaskedInput, Calendar, DropButton, Text, RadioButtonGroup } from "grommet";
import { Close, Schedule, FormNext } from "grommet-icons";
import FormButtons from "./FormButtons";

const o_timeMask = [
    {
        length: [1, 2],
        options: Array.from({ length: 24 }, (i, j) => j + 1),
        regexp: /^1[1-2]$|^[0-9]$/,
        placeholder: "hh",
    },
    { fixed: ":" },
    {
        length: 2,
        options: ["00", "15", "30", "45"],
        regexp: /^[0-5][0-9]$|^[0-9]$/,
        placeholder: "mm",
    }
];

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
            b_isCancelled: this.props.b_isCancelled
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.resetValues = this.resetValues.bind(this);
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
        const { s_title, f_closeLayer, f_submitNewMatchday } = this.props;
        const { s_opponent, s_dateTime, s_maxSpaces, b_isCancelled } = this.state;
        return (
            <Layer position="center">
                <Box direction="row-responsive" align="center" justify="between" pad={{ "right": "medium", "top": "small", "left": "medium" }}>
                    <Heading level="3" margin={{ "right": "xlarge" }}>{s_title}</Heading>
                    <Button icon={<Close />} onClick={f_closeLayer} />
                </Box>
                <Box direction="column" pad={{ "left": "medium", "right": "medium", "bottom": "medium" }}>
                    <Form onReset={this.resetValues} onSubmit={f_submitNewMatchday} messages={o_formValidationMessages} validate="blur">
                        <FormField required label="Gegner" name="s_opponent">
                            <TextInput name="s_opponent" value={s_opponent} onChange={this.resetValues} placeholder="TSG Hoffenheim" />
                        </FormField>
                        <FormField required label="Datum">
                            <DropButton dropContent={
                                <Box pad="medium" gap="medium">
                                    <Calendar />
                                    <MaskedInput mask={o_timeMask} />
                                </Box>
                            }>
                                <Text>Test</Text>
                                <Schedule />
                            </DropButton>
                        </FormField>

                        <FormField required label="Verfügbare Plätze" name="s_maxSpaces">
                            <MaskedInput name="s_maxSpaces" value={s_maxSpaces} placeholder="200" onChange={this.handleInputChange} />
                        </FormField>
                        <FormField required label="Status" name="b_isCancelled">
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