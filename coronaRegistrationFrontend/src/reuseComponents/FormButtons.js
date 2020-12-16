import React from "react";
import { Button, Box } from "grommet";
import { FormNext } from "grommet-icons";
/**
 * @class Formbuttons
 */
class FormButtons extends React.Component {

    /**
     * Renders a button used for the booking and editmatchday forms
     */
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