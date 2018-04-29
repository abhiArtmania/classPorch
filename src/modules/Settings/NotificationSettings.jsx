import React, { Component } from 'react';
import { Card, Grid, Header, Feed, Divider, Button, Label, Tab, Icon, Dropdown, Form, Input, Select } from 'semantic-ui-react';

const options = [
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2 },
    { key: 3, text: 'Choice 3', value: 3 },
]

export class NotificationSettings extends Component {

    render() {
        return (
            <Tab.Pane >
                <Grid padding columns={16} padded>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <p>  <Header as='h3'> Notificatons </Header></p>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
                    <Grid.Row columns={16}>
                        <Grid.Column width={7}>
                            <Header as='h3'>
                                <Header.Content>
                                    Mobile
                            </Header.Content>
                            </Header>
                        </Grid.Column>
                        <Grid.Column width={9}>
                            <Header as='h3'>
                                <Header.Content>
                                    Email
                            </Header.Content>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row padded columns={16}>
                        <Grid.Column width={7}>
                            <Form padded>
                                <Form.Group widths='equal'>
                                    <Form.Field label='Send push notifications for:' control={Select} options={options} />
                                </Form.Group>
                            </Form>
                        </Grid.Column>
                        <Grid.Column width={9}>
                            <Form padded>
                                <Form.Group widths='equal'>
                                    <Form.Field label='Send an email with unread activity for:' control={Select} options={options} />
                                </Form.Group>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Tab.Pane >
        );
    }
}
