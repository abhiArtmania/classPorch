import React, { Component } from 'react';
import { Card, Grid, Header, Feed, Divider, Button, Label, Tab, Icon, Dropdown, Form, Input, Select } from 'semantic-ui-react';

const options = [
    { key: 1, text: 'All Activity', value: 1 },
    { key: 2, text: 'Nothing', value: 2 },
    { key: 3, text: 'Once a day', value: 3 },
]

export class NotificationSettings extends Component {

    state = {
        mobile: 1,
        email: 1,
    }

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
                        <Grid.Column width={6}>
                            <Header as='h3'>
                                <Header.Content>
                                    Mobile
                            </Header.Content>
                            </Header>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Header as='h3'>
                                <Header.Content>
                                    Email
                            </Header.Content>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row padded columns={16}>
                        <Grid.Column width={6}>
                            <Form padded>
                                <Form.Group widths='equal'>
                                    <Form.Field value={this.state.mobile} label='Send push notifications for:' control={Select} options={options} />
                                </Form.Group>
                            </Form>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Form padded >
                                <Form.Group widths={16}>
                                    <Form.Field style={{ minWidth: '500px' }} value={this.state.email} label='Send an email with unread activity for:' control={Select} options={options} />
                                </Form.Group>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Tab.Pane >
        );
    }
}
