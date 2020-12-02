import React from "react"; 
import {  Text, DataTable } from "grommet"; 

class UserDataTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            a_visitorData: [],
            error: null,
        };

    }

    //https://coronaprojekt.cfapps.eu10.hana.ondemand.com/api/matches
    componentDidMount() {
        fetch("api/visitors",
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    a_visitorData: result.data
                });
            },
                (error) => {
                    this.setState({
                        ...this.state,
                        error
                    })
                }
            )
    }

    //http://localhost:8000/api/visitors
    render() {
        const { a_visitorData: a_visitorData, error } = this.state;
        
        return (
            
            <DataTable
            columns={[
                
                {
                    property: 'id',
                    header: 'ID',
                    search: true
                },
                {
                    property: 'fName',
                    header: 'Vorname',
                    search: true
                },
                {
                    property: 'lName',
                    header: 'Nachname',
                    search: true
                },
                {
                    property: 'city',
                    header: 'Stadt',
                },
                {
                    property: 'postcode',
                    header: 'Postleitzahl',
                },
                {
                    property: 'street',
                    header: 'Straße',
                },
                {
                    property: 'houseNumber',
                    header: 'Haunummer',
                },
                {
                    property: 'eMail',
                    header: 'Email Adresse',
                    search: true
                },
                {
                    property: 'phoneNumber',
                    header: 'Telefonnummer',
                    search: true
                },

            ]}
            data={a_visitorData}
            
        />
        ); 
    }
}

export default UserDataTable; 