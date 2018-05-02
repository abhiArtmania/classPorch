import React, { Component } from 'react';
import { apiEndpoints } from '../../ApiEndpoints';
import { Grid, Label, Image, Loader, Table } from 'semantic-ui-react';


export class PreviousExpenses extends Component {

    state = {
        loading: true,
        previousExpenses: []
    };


    componentDidMount = async () => {
        try {
            const resRaw = await fetch(apiEndpoints.previousExpenses, {
                method: 'GET',
                headers: {
                    'auth_token': this.props.auth_token,
                    'Content-Type': 'application/json'
                },
            });
            if (resRaw.status !== 200) {
                throw 'error'
            }
            const res = await resRaw.json();
            this.setState({
                previousExpenses: res.response.payment_details,
                loading: false
            })
        } catch (e) {
            console.log(e)
        }
    };

    shouldComponentUpdate() {
        return true;
    }


    render() {

        if (this.state.loading) {
            return <Loader active inline='centered' />
        }

        return (

            <Table celled>
                <Table.Header className='saveUpdate'>
                    <Table.Row>
                        <Table.HeaderCell> #</Table.HeaderCell>
                        <Table.HeaderCell>Sender Name</Table.HeaderCell>
                        <Table.HeaderCell>Receiver Name</Table.HeaderCell>
                        <Table.HeaderCell>Payment Type</Table.HeaderCell>
                        <Table.HeaderCell>Payment Status</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.state.previousExpenses && this.state.previousExpenses.map((p, i) => {
                        return (<Table.Row>
                            <Table.Cell>{i}</Table.Cell>
                            <Table.Cell>{p.sender && p.sender.name}</Table.Cell>
                            <Table.Cell>{p.receiver && p.receiver.name}</Table.Cell>
                            <Table.Cell>{p.payment_type}</Table.Cell>
                            <Table.Cell>{p.payment_status ? "True" : "False"}</Table.Cell>
                            <Table.Cell>{p.amount}</Table.Cell>
                        </Table.Row>);
                    })
                    }
                </Table.Body>
            </Table>




        );
    }

}