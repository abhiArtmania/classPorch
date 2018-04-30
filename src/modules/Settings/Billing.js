import React, { Component } from 'react';
import { Grid, Divider, Header, Select, Form, Label, Card, Button, Modal } from 'semantic-ui-react';


export class Billing extends Component {

    state = {
        balanceDue: 0.00,
    }


    render() {
        return (
            <Grid padding columns={16} padded>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <p>  <Header as='h2'> Billing And Payment Processing </Header></p>
                    </Grid.Column>
                </Grid.Row>
                <Divider />
                <Grid.Row columns={16}>
                    <Grid.Column width={7}>
                        <Header as='h3'>
                            <Header.Content>
                                Balance Due
                    </Header.Content>
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row padded columns={16}>
                    <Grid.Column width={7}>
                        <Form padded >
                            <Form.Group widths='equal'>
                                <Form.Field style={{ minWidth: '250px' }} label={`Your balance due is: $${this.state.balanceDue}`} control={Header} />
                            </Form.Group>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={16}>
                    <Grid.Column width={5}>
                        <h3>Billing Methods</h3>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <Button onClick={() => { this.setState({ open: true }) }} >
                            Add Billing Method
                        </Button>

                    </Grid.Column>

                </Grid.Row>
                <Modal style={{ height: '200px' }} size={'tiny'} open={this.state.open} onClose={() => { this.setState({ open: false }) }}>
                    <Modal.Header>
                        Add Your Billing Method / Credit Card
                     </Modal.Header>
                    <Modal.Content>
                        Card Details
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative>
                            No
                          </Button>
                        <Button positive icon='checkmark' labelPosition='right' content='Yes' />
                    </Modal.Actions>
                </Modal>
            </Grid>
        );
    }



}