import React, { Component } from 'react';
import { Card, Grid, Header, Feed, Divider, Button, Label, Form, Field, Select } from 'semantic-ui-react';
import Phone from 'react-phone-number-input';
import { CountryList } from "../../helpers/utils";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

export class PersonalInfo extends Component {

    state = {
        mode: 'view',
        selectCountry: undefined,
        state: undefined,
        phoneCode: '+1',
        gradesList: [
            { key: 'Grade 1', value: '1', text: 'Grade 1' },
            { key: 'Grade 2', value: '2', text: 'Grade 2' },
            { key: 'Grade 3', value: '3', text: 'Grade 3' },
            { key: 'Grade 4', value: '4', text: 'Grade 4' },
            { key: 'Grade 5', value: '5', text: 'Grade 5' },
            { key: 'Grade 6', value: '6', text: 'Grade 6' },
            { key: 'Grade 7', value: '7', text: 'Grade 7' },
            { key: 'Grade 8', value: '8', text: 'Grade 8' },
            { key: 'Grade 9', value: '9', text: 'Grade 9' },
            { key: 'Grade 10', value: '10', text: 'Grade 10' },
            { key: 'Grade 11', value: '11', text: 'Grade 11' },
            { key: 'Grade 12', value: '12', text: 'Grade 12' },
            { key: 'Year 1', value: '13', text: 'Year 1' },
            { key: 'Year 2', value: '14', text: 'Year 2' },
            { key: 'Year 3', value: '15', text: 'Year 3' },
            { key: 'Year 4', value: '16', text: 'Year 4' },

        ],
        grade: this.props.grade,
        showParents: this.props.grade ? (this.props.grade > 12 ? false : true) : true,
        state: this.props.state,
        initialProfile: this.props
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        this.setState({ state: newProps.state, selectCountry: newProps.country, grade: newProps.grade, showParents: newProps.grade ? (newProps.grade > 12 ? false : true) : true });
    }

    render() {
        const props = this.props;
        const state = this.state;
        return (
            <Form >
                <Grid padded columns={3} >
                    <Grid.Row columns={16}>
                        <Grid.Column width={4}>
                            <Header as='h2'>Personal Information</Header>
                        </Grid.Column>
                        <Grid.Column textAlign="right" width={12}>
                            <Button.Group>
                                <Button icon='edit' className='saveUpdate' onClick={() => this.updateMode('edit')} content={state.mode === 'edit' ? 'Update' : 'Edit'} />
                                {state.mode === 'edit' && <Button.Or />}
                                {state.mode === 'edit' && <Button icon='close' labelPosition='right' onClick={() => this.updateMode('view')} content={'Cancel'} />}
                            </Button.Group>


                        </Grid.Column>
                    </Grid.Row>
                    <Divider />

                    {/* Personal Information */}
                    <Grid.Row>
                        <Grid.Column width={14}>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label>Full Name</label>
                                    {state.mode === 'edit' ?
                                        <input placeholder='Full Name' type='text' name='fullname' value={props.fullname} onChange={props.onChange} />
                                        : <h4>{props.fullname}</h4>
                                    }
                                </Form.Field>
                                {state.showParents &&
                                    <Form.Field>
                                        <label>Parent's Full Name</label>
                                        {state.mode === 'edit' ?
                                            <input placeholder='Full Name' type='text' name='parent_fullname' value={props.parent_fullname} onChange={props.onChange} />
                                            : <h4>{props.parent_first_name} {props.parent_last_name}</h4>
                                        }
                                    </Form.Field>
                                }
                                <Form.Field>
                                    <label>Email</label>
                                    {state.mode === 'edit' ?
                                        <input placeholder='Email' name="email" type='email' value={props.email} onChange={props.onChange} />
                                        : <h4>{props.email}</h4>
                                    }
                                </Form.Field>
                            </Form.Group >
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label>Phone Number</label>
                                    {state.mode === 'edit' ?
                                        <Phone
                                            placeholder="Enter phone number"
                                            autoComplete="off"
                                            displayInitialValueAsLocalNumber={true}
                                            value={props.number}
                                            required
                                            phoneCode={state.phoneCode}
                                            onChange={this.setPhone}
                                        />
                                        : <h4>{props.number}</h4>
                                    }
                                </Form.Field>
                                <Form.Field>
                                    <label>Grade</label>
                                    {state.mode === 'edit' ?
                                        <Select
                                            name='grade'
                                            options={this.state.gradesList} fluid
                                            placeholder="Select your grade"
                                            id='grade' selection fluid
                                            value={state.grade}
                                            onChange={this.onchangeGrade}
                                        />
                                        : <h4>{props.grade}</h4>
                                    }
                                </Form.Field>
                                <Form.Field>
                                    <label>City</label>
                                    {state.mode === 'edit' ?
                                        <input placeholder='City' name='city' value={props.city} onChange={props.onChange} />
                                        : <h4>{props.city}</h4>
                                    }
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <label>Country</label>
                                    {state.mode === 'edit' ?
                                        <CountryDropdown name='country' value={state.selectCountry || props.country} onChange={this.onSelectChange} />
                                        : <h4>{props.country}</h4>
                                    }
                                </Form.Field>
                                <Form.Field>
                                    <label>State/Province</label>
                                    {state.mode === 'edit' ?
                                        <RegionDropdown name="state" country={state.selectCountry || props.state} value={state.state} onChange={this.selectRegion} />
                                        : <h4>{props.state}</h4>
                                    }
                                </Form.Field>
                                <Form.Field>
                                </Form.Field>
                            </Form.Group>
                        </Grid.Column>
                    </Grid.Row >
                </Grid >
            </Form>
        );
    }

    updateMode = async (mode) => {
        if (this.state.mode === 'edit' && mode === 'edit') {
            ///need to call ajax to update info



        } else {
            this.setState({ mode: mode }, () => this.props.resetProps && this.props.resetProps(this.state.initialProfile));
        }
    }

    setPhone = (value) => {
        const e = { target: { name: 'number', value: value } }
        this.setState({ value }, () => this.props.onChange && this.props.onChange(e));

    }

    selectRegion = (value) => {
        this.setState({ state: value });
        const name = 'state';
        this.setState({ [name]: value })
        const e = { target: { name: name, value: value } };
        this.props.onChange && this.props.onChange(e);

    }

    onSelectChange = (event) => {
        const name = 'country';
        const value = event;
        const e = { target: { name: name, value: event } };
        this.setState({ [name]: value, selectCountry: event }, () => this.props.onChange && this.props.onChange(e));
    }


    onchangeGrade = (e, { name, value }) => {
        e.target.name = name;
        e.target.value = value;


        if (value <= 12) {
            this.setState({ showParents: true, grade: value });
        } else {
            this.setState({ showParents: false, grade: value });
        }
        this.props.onChange && this.props.onChange(e);
    };
}