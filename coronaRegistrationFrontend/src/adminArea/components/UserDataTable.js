import React from "react";
import { Button, DataTable, Box } from "grommet";
import { ExportToCsv } from "export-to-csv";
import { Download, Trash } from "grommet-icons";
import { formatDateTime } from "../../util/Helpers";
/**
 * @class UserDataTable
 */
class UserDataTable extends React.Component {
    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = { a_visitorDataRestructured: [{}] }
        this.exportToCsv = this.exportToCsv.bind(this);
        this.restructureArray = this.restructureArray.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.a_visitorData !== this.props.a_visitorData) {
            this.setState({
                a_visitorDataRestructured: this.restructureArray()
            })

        }

    }


    /**
     * Creates a new array based on the visitor Data taken from the api. The new array combines data from the matches, the bookings and the visitor data
     * @returns {Array[][]} Returns the newly created array
     */
    restructureArray() {
        const { a_visitorData, b_isAdminHomepage } = this.props;

        var a_visitorDataRestructured = [];

        for (var i = 0; i < a_visitorData.length; i++) {
            const o_visitor = {
                "id": a_visitorData[i].id,
                "fName": a_visitorData[i].visitor.fName,
                "lName": a_visitorData[i].visitor.lName,
                "city": a_visitorData[i].visitor.city,
                "postcode": a_visitorData[i].visitor.postcode,
                "street": a_visitorData[i].visitor.street,
                "houseNumber": a_visitorData[i].visitor.houseNumber,
                "eMail": a_visitorData[i].visitor.eMail,
                "phoneNumber": a_visitorData[i].visitor.phoneNumber
            }
            if (b_isAdminHomepage) {
                o_visitor.date = a_visitorData[i].match.date;
            }
            a_visitorDataRestructured.push(o_visitor);
        }
        return a_visitorDataRestructured

    }
    /**
    *  Creates a .csv file from the restructured visitor Data array
    */
    exportToCsv() {
        const { b_isAdminHomepage, a_visitorData } = this.props;
        let s_title = "Buchungsdaten"
        if (!b_isAdminHomepage) {
            const o_formattedDate = formatDateTime(a_visitorData[0].match.date)
            s_title = "Spieltag FG 08 Mutterstadt gg. " + a_visitorData[0].match.opponent + " am " + o_formattedDate.s_formattedDate + o_formattedDate.s_time;
        }
        const options = {
            fieldSeparator: ";",
            filename: s_title,
            quoteStrings: "'",
            decimalSeparator: ".",
            showLabels: true,
            showTitle: true,
            title: s_title,
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
        };

        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(this.state.a_visitorDataRestructured);
    }

    /**
     * Renders the DataTable from the restructured booking data. Also gives an option to delete old user data or download a csv file from the data
     */
    render() {
        const { b_isAdminHomepage, f_deleteOldData } = this.props;
        return (
            <Box>
                {!b_isAdminHomepage ?
                    <Box align="end">
                        <Button icon={<Download />} label="Download CSV" onClick={this.exportToCsv} />
                    </Box>
                    :
                    <Box align="end">
                        <Button icon={<Trash />} label="Alte Buchungen löschen" onClick={f_deleteOldData} />
                    </Box>
                }
                <DataTable size="large" pad="xxsmall"
                    columns={[
                        {
                            align: "start",
                            property: "id",
                            header: "ID",
                            search: true,
                            size: "xsmall",
                            primary: true
                        },
                        {
                            align: "start",
                            property: "fName",
                            header: "Vorname",
                            search: true,
                            size: "small"
                        },
                        {
                            align: "start",
                            property: "lName",
                            header: "Nachname",
                            search: true,
                            size: "small"
                        },
                        {
                            align: "start",
                            property: "city",
                            header: "Stadt",
                            size: "small"
                        },
                        {
                            align: "start",
                            property: "postcode",
                            header: "PLZ",
                            size: "xsmall"
                        },
                        {
                            align: "start",
                            property: "street",
                            header: "Straße",
                            size: "small"
                        },
                        {
                            align: "start",
                            property: "houseNumber",
                            header: "Hausnr.",
                            size: "xsmall"
                        },
                        {
                            align: "start",
                            property: "eMail",
                            header: "E-Mail Adresse",
                            search: true, 
                            size: "medium"
                        },
                        {
                            align: "start",
                            property: "phoneNumber",
                            header: "Telefonnummer",
                            search: true,
                            size: "small"
                        },
                    ]}
                    data={this.state.a_visitorDataRestructured}
                />
            </Box>
        );

    }
}

export default UserDataTable; 