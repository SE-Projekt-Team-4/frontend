import React from "react"; 
import {  Text, DataTable } from "grommet"; 

class UserDataTable extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {}; 
    }

    render() {
        return (
            <DataTable
            columns={[
                {
                property: 'name',
                header: <Text>Name</Text>,
                primary: true,
                },
                
                {
                    property: 'adress',
                    header: 'Adresse',
                },
                {
                    property: 'email',
                    header: 'E-Mail',
                },
                {
                    property: 'telnr',
                    header: 'Telefonnummer',
                },
                {
                    property: 'ordernr',
                    header: 'Buchungscode',
                },

            ]}
            data={[
                { name: 'Alan', adress: 'A Straße 20', email: 'xyzmail', telnr: '123123', ordernr: '766786' },
                { name: 'Bryan', adress: 'B Straße 20', email: 'xyzmail', telnr: '123123', ordernr: '766786' },
                { name: 'Chris', adress: 'C Straße 20', email: 'xyzmail', telnr: '123123', ordernr: '766786' },
                { name: 'Eric', adress: 'D Straße 20', email: 'xyzmail', telnr: '123123', ordernr: '766786' },
            ]}
        />
        ); 
    }
}

export default UserDataTable; 