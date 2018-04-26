import React from 'react';
import { Card, Grid, Header, Feed, Divider, Button, Label, Tab, Icon, Dropdown } from 'semantic-ui-react';

const options = [
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2 },
    { key: 3, text: 'Choice 3', value: 3 },
]

export const NotificationSettings = (props) => {
    return (
        <Tab.Pane >
            <Grid padding columns={16} padded>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <p>  <Header as='h3'> Notificatons </Header></p>
                    </Grid.Column>
                </Grid.Row>
                <Divider section />
                <Grid.Row>
                    <Grid.Column width={12}>
                        <Header as='h3'>
                            <Header.Content>
                                Desktop
                            </Header.Content>
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={16}>
                 
                    <Dropdown  options={options} simple item />
                </Grid.Row>
            </Grid>
        </Tab.Pane>
    );
}
