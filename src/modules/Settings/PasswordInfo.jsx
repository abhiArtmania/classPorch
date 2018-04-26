import React from 'react';
import { Card, Grid, Header, Feed, Divider, Button, Label, Tab, Icon } from 'semantic-ui-react';



export const PasswordInfo = (props) => {
    return (
        <Tab.Pane >
            <Grid padding columns={16} padded>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <p>  <Header as='h3'> Password</Header></p>
                    </Grid.Column>
                </Grid.Row>
                <Divider section />
                <Grid.Row>
                    <Grid.Column width={12}>
                        <Header as='h3'>
                            <Icon name='lock' />
                            <Header.Content>
                                Password has been set
                  <Header.Subheader>
                                    Choose a strong, unique password that’s at least 8 characters long.
                  </Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Button content='Edit' icon='edit' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Tab.Pane>
    );
}
