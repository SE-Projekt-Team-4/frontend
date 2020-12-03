import React from "react";
import { Button, Box } from "grommet";
import { FormNext } from "grommet-icons";

class FormButtons extends React.Component {
    render() {
        return (
            <Box direction="row-responsive" gap="small" margin={{ top: "medium" }}>
                <Button type="reset" label="Zurücksetzen" />
                <Button primary reverse type="submit" label="Weiter" icon={<FormNext />} gap="xxsmall" />
            </Box>
        )
    }
}

export default FormButtons; 