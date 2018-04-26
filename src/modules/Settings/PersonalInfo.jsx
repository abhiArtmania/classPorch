import React from 'react';
import { Card, Grid, Header, Feed, Divider, Button, Label } from 'semantic-ui-react';

export const PersonalInfo = (props) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    <Grid columns={3}>
                        <Grid.Row columns={16}>
                            <Grid.Column width={4}>
                                Account
                </Grid.Column>
                            <Grid.Column textAlign="right" width={12}>
                                <Button icon='edit' content='Edit' />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Header>
            </Card.Content>
            <Card.Content>
                <Feed>
                    <Feed.Event>
                        <Feed.Content>
                            <Feed.Summary>
                                <Grid columns={12} padded >
                                    <Grid.Row columns={12}>
                                        <Grid.Column width={2}>
                                            User Id
                    </Grid.Column>
                                        <Grid.Column width={8}>
                                            <Label size='large'> {props.id}</Label>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Feed.Summary>
                        </Feed.Content>
                    </Feed.Event>

                    <Feed.Event>
                        <Feed.Content>
                            <Feed.Summary>
                                <Grid columns={12} padded >
                                    <Grid.Row columns={12}>
                                        <Grid.Column width={2}>
                                            Name
                    </Grid.Column>
                                        <Grid.Column width={8}>
                                            <Label basic size='large'>{props.fullname}</Label>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Feed.Summary>
                        </Feed.Content>
                    </Feed.Event>

                    <Feed.Event>
                        <Feed.Content>
                            <Feed.Summary>
                                <Grid columns={12} padded >
                                    <Grid.Row columns={12}>
                                        <Grid.Column width={2} >
                                            Email
                    </Grid.Column>
                                        <Grid.Column width={8}>
                                            {props.email}
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Feed.Summary>
                        </Feed.Content>
                    </Feed.Event>

                    <Feed.Event>
                        <Feed.Content>
                            <Feed.Summary>
                                <Grid columns={16} padded >
                                    <Grid.Row columns={16}>
                                        <Grid.Column width={16} textAlign='right' >
                                            <Label size='small'>Close My Account</Label>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>

                            </Feed.Summary>
                        </Feed.Content>
                    </Feed.Event>

                </Feed>
            </Card.Content>
        </Card>);

}