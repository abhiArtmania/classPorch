import React, { Component } from 'react';
import { Grid, Divider, Header, Select, Form, Label, Card } from 'semantic-ui-react';


export class Billing extends Component {

    state = {}


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
                        <Form padded>
                            <Form.Group widths='equal'>
                                <Form.Field label='Your balance due is: ' control={Header} />
                            </Form.Group>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }



}