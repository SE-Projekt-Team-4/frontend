import React from "react";
import { DataTable } from "grommet";

class UserDataTable extends React.Component {

    render() {
        const { a_visitorData } = this.props;
        return (
            <DataTable size="large" 
                columns={[
                    {
                        property: "id",
                        header: "ID",
                        search: true,
                        size: "xsmall",
                        primary: true
                    },
                    {
                        property: "fName",
                        header: "Vorname",
                        search: true,
                        size: "small"
                    },
                    {
                        property: "lName",
                        header: "Nachname",
                        search: true,
                        size: "small"
                    },
                    {
                        property: "city",
                        header: "Stadt",
                        size: "small"
                    },
                    {
                        property: "postcode",
                        header: "PLZ",
                        size: "xsmall"
                    },
                    {
                        property: "street",
                        header: "Straße"
                    },
                    {
                        property: "houseNumber",
                        header: "Hausnr.",
                        size: "xsmall"
                    },
                    {
                        property: "eMail",
                        header: "E-Mail Adresse",
                        search: true
                    },
                    {
                        property: "phoneNumber",
                        header: "Telefonnummer",
                        search: true
                    },
                ]}
                data={a_visitorData}
            />
        );
    }
}

export default UserDataTable; 