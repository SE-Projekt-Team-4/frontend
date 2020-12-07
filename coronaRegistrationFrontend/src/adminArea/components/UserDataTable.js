import React from "react";
import { Button, DataTable, Box } from "grommet";
import { ExportToCsv } from 'export-to-csv';
import { Download } from 'grommet-icons';

class UserDataTable extends React.Component {

    constructor (props) {
        super(props);
        this.exportToCsv= this.exportToCsv.bind(this);
    }


    exportToCsv() {
        const { a_visitorData } = this.props;
        const options = { 
            fieldSeparator: ';',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true, 
            showTitle: true,
            title: 'Visitor Data',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
          };
          
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(a_visitorData);
    }

    render() {
        const { a_visitorData } = this.props;
        return (
            <Box>
                 <Box align = "end">
                <Button icon={<Download />} label="Download CSV" onClick={this.exportToCsv} />
                </Box>


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
            </Box>
        );
        
    }
}

export default UserDataTable; 