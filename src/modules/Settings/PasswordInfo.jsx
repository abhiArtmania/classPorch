import React, { Component } from 'react';
import { Card, Grid, Header, Feed, Divider, Button, Label, Tab, Icon, Input } from 'semantic-ui-react';
import { apiEndpoints } from '../../ApiEndpoints';


export class PasswordInfo extends Component {

    state = {
        mode: 'view',
        passwordInfo: {
            old_password: undefined,
            new_password: undefined,
            confirm_new_password: undefined
        }
    }

    render() {
        const state = this.state;
        const props = this.props;
        return (
            <Tab.Pane >
                <Grid padding columns={16} padded>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <p>  <Header as='h2'> Password</Header></p>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
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
                            <Button.Group>
                                <Button icon='edit' onClick={() => this.updateMode('edit')} content={state.mode === 'edit' ? 'Update' : 'Edit'} />
                                {state.mode === 'edit' && <Button.Or />}
                                {state.mode === 'edit' && <Button icon='close' labelPosition='right' onClick={() => this.updateMode('view')} content={'Cancel'} />}
                            </Button.Group>
                        </Grid.Column>
                    </Grid.Row>
                    {state.mode === 'edit' &&
                        <Grid padded>
                            <Grid.Row columns={16}>
                                <Grid.Column width={16}>
                                    <Input placeholder='Old Password' type='password' size='small' icon='lock' name='old_password'
                                        onChange={(e) =>
                                            this.setState({
                                                passwordInfo:
                                                    {
                                                        old_password: e.target.value,
                                                        confirm_new_password: this.state.passwordInfo.confirm_new_password,
                                                        new_password: this.state.passwordInfo.new_password
                                                    }
                                            })}
                                    />
                                </Grid.Column>

                            </Grid.Row>
                            <Grid.Row columns={16}>
                                <Grid.Column width={16}>
                                    <Input placeholder='Old Password' type='password' size='small' icon='lock' name='new_password'
                                        onChange={(e) =>
                                            this.setState({
                                                passwordInfo:
                                                    {
                                                        old_password: this.state.old_password,
                                                        confirm_new_password: this.state.passwordInfo.confirm_new_password,
                                                        new_password: e.target.value
                                                    }
                                            })}

                                    />
                                </Grid.Column>

                            </Grid.Row>
                            <Grid.Row columns={16}>
                                <Grid.Column width={16}>
                                    <Input placeholder='Old Password' type='password' size='small' icon='lock' name='confirm_new_password'
                                        onChange={(e) =>
                                            this.setState({
                                                passwordInfo:
                                                    {
                                                        old_password: this.state.passwordInfo.old_password,
                                                        confirm_new_password: e.target.value,
                                                        new_password: this.state.passwordInfo.new_password
                                                    }
                                            })}

                                    />
                                </Grid.Column>

                            </Grid.Row>
                        </Grid>
                    }
                </Grid>
            </Tab.Pane>
        );
    }

    updateMode = (mode) => {
        if (this.state.mode === 'edit' && mode === 'edit') {
            ///need to call ajax to update info
            const password = { password: this.state.passwordInfo }
            fetch(apiEndpoints.changePassword(this.props.id), {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(password)
            })
                .then(function (response) {
                    console.log(response);
                }, function (error) {
                    console.log(error);

                }).catch(function (error) { });
        } else {
            this.setState({ mode: mode }, () => this.props.resetProps && this.props.resetProps(this.state.initialProfile));
        }
    }

}
