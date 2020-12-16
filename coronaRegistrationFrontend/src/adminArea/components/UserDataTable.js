import React from "react";
import { Button, DataTable, Box } from "grommet";
import { ExportToCsv } from "export-to-csv";
import { Download, Trash } from "grommet-icons";

class UserDataTable extends React.Component {

    constructor (props) {
        super(props);
        this.exportToCsv= this.exportToCsv.bind(this);
    }

    // Diese Funktion baut ein Anzeigbares Array - Es könnte auch noch der jewilige gebuchte Spieltag mit augegeben werden (abgespeichert in a_visitorDataRestructured[x][1])
    // Die csv Ausgabe ist noch nicht so schön - das useKeysAsHeaders müsste denke ich auf false und die keys müssten manuell eingestellt werden - mache ich dann aber morgen
    // muss jetzt wirklich schlafen gehen :) - mache dann auch morgen früh noch die jsdocs fertig - sonst können wir auch gerne morgen so ab 9 telefonieren 
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

    //bei Delete Data muss noch der entsprechende Befehl eingefügt werden / der Exportbefehl ist aber zur prüfung des Arrays noch ganz nützlich
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