import React, { Component } from 'react';
import { Grid, Header, Divider, Button, Form, Select } from 'semantic-ui-react';
import Phone from 'react-phone-number-input';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import { CountryList } from "../../helpers/utils";

export class PersonalInfo extends Component {
    state = {
        mode: 'view',
        country: this.props.country,
        phoneCode: '+1',
        grade: this.props.grade,
        showParents: this.props.grade ? (this.props.grade > 12 ? false : true) : true,
        state: this.props.state,
        initialProfile: this.props
    }
    Update = () => {
        this.props.onSubmitForm();
        this.setState({ mode: 'view' });
    }
    updateMode = async (mode) => {
        this.setState(
            { mode: mode },
            () => this.props.resetProps && this.props.resetProps(this.state.initialProfile));
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
    onChangeGrade = (e, { name, value }) => {
        e.target.name = name;
        e.target.value = value;
        if (value <= 12) {
            this.setState({ showParents: true, grade: value });
        } else {
            this.setState({ showParents: false, grade: value });
        }
        this.props.onChange && this.props.onChange(e);
    }
    render() {
        const state = this.state;
        return (
            <Form encType='application/json' onSubmit={this.onFormSubmitted}>
                <Grid padded columns={4} >
                    <Grid.Row columns={16}>
                        <Grid.Column width={4}>
                            <Header as='h2'>Personal Information</Header>
                        </Grid.Column>
                        <Grid.Column textAlign="right" width={12}>
                            {state.mode !== 'edit' && <Button icon='edit' className='saveUpdate' type={'submit'} onClick={() => this.updateMode('edit')} content={'Edit'} />}
                            {state.mode === 'edit' && <Button.Group>
                                <Button
                                    icon='edit'
                                    className='saveUpdate'
                                    type={'submit'}
                                    onClick={this.Update}
                                    content={'Update'} />
                                <Button.Or />
                                <Button icon='close' labelPosition='right' onClick={() => this.updateMode('view')} content={'Cancel'} />
                            </Button.Group>
                            }
                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
                    {state.mode !== 'edit' && <PersonalInfoView {...this.props} />}
                    {state.mode === 'edit' && <PersonalInfoEdit {...this.props} />}
                </Grid>
            </Form>
        );
    }
}

const PersonalInfoView = (props) => {
    const showParents = props.grade ? (props.grade > 12 ? false : true) : true;
    return (
        <Grid.Row>
            <Grid.Column width={14}>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Full Name</label>
                        <h4>{props.fullname}</h4>
                    </Form.Field>
                    {showParents &&
                        <Form.Field>
                            <label>Parent's Full Name</label>
                            <h4>{props.parent_first_name} {props.parent_last_name}</h4>
                        </Form.Field>
                    }
                    <Form.Field>
                        <label>Email</label>
                        <h4>{props.email}</h4>
                    </Form.Field>
                </Form.Group >
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Phone Number</label>
                        <h4>{props.number}</h4>
                    </Form.Field>
                    <Form.Field>
                        <label>Grade</label>
                        <h4>{props.grade}</h4>
                    </Form.Field>
                    <Form.Field>
                        <label>City</label>
                        <h4>{props.city}</h4>
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Country</label>
                        <h4>{props.country}</h4>
                    </Form.Field>
                    <Form.Field>
                        <label>State/Province</label>
                        <h4>{props.state}</h4>
                    </Form.Field>
                    <Form.Field>
                    </Form.Field>
                </Form.Group>
            </Grid.Column>
        </Grid.Row >
    );
}

const PersonalInfoEdit = (props) => {
    const showParents = props.grade ? (props.grade > 12 ? false : true) : true;
    const gradesList = [
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
    ];
    return (
        <Grid.Row>
            <Grid.Column width={14}>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Full Name</label>
                        <input placeholder='First Name' type='text' name='first_name' value={props.first_name} onChange={props.onChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Last Name</label>
                        <input placeholder='Last Name' type='text' name='last_name' value={props.last_name} onChange={props.onChange} />
                    </Form.Field>
                    {showParents &&
                        <Form.Field>
                            <label>Parent's Full Name</label>
                            <input placeholder='Parent First Name' type='text' name='parent_first_name' value={props.parent_first_name} onChange={props.onChange} />
                        </Form.Field>
                    }
                    {showParents &&
                        <Form.Field>
                            <label>Parent's Last Name</label>
                            <input placeholder='Parent Last Name' type='text' name='parent_last_name' value={props.parent_last_name} onChange={props.onChange} />
                        </Form.Field>
                    }
                </Form.Group >
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Email</label>
                        <input placeholder='Email' name="email" type='email' value={props.email} onChange={props.onChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Phone Number</label>
                        <Phone
                            placeholder="Enter phone number"
                            autoComplete="off"
                            displayInitialValueAsLocalNumber={true}
                            value={props.number}
                            required
                            phoneCode={props.phoneCode}
                            onChange={props.setPhone}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Grade</label>
                        <Select
                            name='grade'
                            options={gradesList}
                            placeholder="Select your grade"
                            id='grade' selection
                            value={props.grade}
                            onChange={props.onChangeGrade}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>City</label>
                        <input placeholder='City' name='city' value={props.city} onChange={props.onChange} />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Country</label>
                        <CountryDropdown name='country' value={props.country} onChange={props.onSelectChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>State/Province</label>
                        <RegionDropdown name="state" country={props.state} value={props.state} onChange={this.selectRegion} />
                    </Form.Field>
                    <Form.Field>
                    </Form.Field>
                </Form.Group>
            </Grid.Column>
        </Grid.Row >
    );
}