import React from "react";
import { Button, DataTable, Box } from "grommet";
import { ExportToCsv } from "export-to-csv";
import { Download, Trash } from "grommet-icons";
/**
 * @module UserDataTable
 * @version 4.2.1
 */
class UserDataTable extends React.Component {
/**
 * 
 * @param {*} props 
 */
    constructor (props) {
        super(props);
        this.exportToCsv= this.exportToCsv.bind(this);
    }

    /**
     * Creates a new array based on the visitor Data taken from the api. The new array combines data from the matches, the bookings and the visitor data
     * @returns {Array[][]} Returns the newly created array
     */
    restructureArray() {

        const { a_visitorData } = this.props;

        var a_visitorDataRestructured = new Array(a_visitorData.length); 

        for (var i = 0; i < a_visitorDataRestructured.length; i++) { 
            a_visitorDataRestructured[i] = new Array(10); 
        } 
        var h = 0; 
            
        for (var i = 0; i < a_visitorDataRestructured.length; i++) { 
            a_visitorDataRestructured[i][0] = a_visitorData[i].id
            a_visitorDataRestructured[i][1] = a_visitorData[i].match.date
            a_visitorDataRestructured[i][2] = a_visitorData[i].visitor.fName
            a_visitorDataRestructured[i][3] = a_visitorData[i].visitor.lName
            a_visitorDataRestructured[i][4] = a_visitorData[i].visitor.city
            a_visitorDataRestructured[i][5] = a_visitorData[i].visitor.postcode
            a_visitorDataRestructured[i][6] = a_visitorData[i].visitor.street
            a_visitorDataRestructured[i][7] = a_visitorData[i].visitor.houseNumber
            a_visitorDataRestructured[i][8] = a_visitorData[i].visitor.eMail
            a_visitorDataRestructured[i][9] = a_visitorData[i].visitor.phoneNumber
            
        } 
        return a_visitorDataRestructured

    }
    /**
    *  Creates a .csv file from the restructured visitor Data array
    */
    exportToCsv() {


        const options = { 
            fieldSeparator: ";",
            quoteStrings: '"',
            decimalSeparator: ".",
            showLabels: true, 
            showTitle: true,
            title: "Visitor Data",
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
          };
          
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(this.restructureArray());
    }

    /**
     * Renders the DataTable from the restructured booking data. Also gives an option to delete old user data or download a csv file from the data
     */
    render() {
        const { a_visitorData, b_isAdminPage } = this.props;
        return (
            <Box>
                {!b_isAdminPage ?
                 <Box align = "end">
                <Button icon={<Download />} label="Download CSV" onClick={this.exportToCsv} />
                </Box>
                :
                <Box align = "end">
                <Button icon={<Trash />} label="Delete Old Data" onClick={this.exportToCsv} /> 
                </Box>
                }


                <DataTable size="large" 
                    columns={[
                        {
                            property: "0",
                            header: "ID",
                            search: true,
                            size: "xsmall",
                            primary: true
                        },
                        {
                            property: "2",
                            header: "Vorname",
                            search: true,
                            size: "small"
                        },
                        {
                            property: "3",
                            header: "Nachname",
                            search: true,
                            size: "small"
                        },
                        {
                            property: "4",
                            header: "Stadt",
                            size: "small"
                        },
                        {
                            property: "5",
                            header: "PLZ",
                            size: "xsmall"
                        },
                        {
                            property: "6",
                            header: "Straße"
                        },
                        {
                            property: "7",
                            header: "Hausnr.",
                            size: "xsmall"
                        },
                        {
                            property: "8",
                            header: "E-Mail Adresse",
                            search: true
                        },
                        {
                            property: "9",
                            header: "Telefonnummer",
                            search: true
                        },
                    ]}
                    data={this.restructureArray()}
                />
            </Box>
        );
        
    }
}

export default UserDataTable; 