import React, { Component } from 'react';
import { Grid, Divider, Header, Select, Form, Label, Card, Button, Modal } from 'semantic-ui-react';
import {
    CardElement,
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    PostalCodeElement,
    PaymentRequestButtonElement,
    StripeProvider,
    Elements,
    injectStripe
} from 'react-stripe-elements';

import CardForm from '../add-credits/checkout-sections/CardForm';


const createOptions = (fontSize) => {
    return {
        style: {
            base: {
                fontSize,
                color: '#424770',
                letterSpacing: '0.025em',
                fontFamily: 'Source Code Pro, monospace',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };
};

export class Billing extends Component {

    state = {
        balanceDue: 0.00,
    }


    render() {
        const card = <Elements>
            <CardForm />

        </Elements>;
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
                        {card}

                    </Grid.Column>

                </Grid.Row>
                <Modal style={{ height: '200px' }} size={'tiny'} open={this.state.open} onClose={() => { this.setState({ open: false }) }}>
                    <Modal.Header>
                        Add Your Billing Method / Credit Card
                     </Modal.Header>
                    <Modal.Content>
                        <label>
                            Card number
                            <CardForm

                            />

                        </label>
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