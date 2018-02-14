import React from 'react';
import {Grid, Input, Radio, Select} from 'semantic-ui-react';
import * as moment from 'moment';
import './styles.css';
import {CountryList} from "../../../../helpers/utils";

export default class AboutSection extends React.Component {

    constructor() {
        super();
        this.changeDob = this.changeDob.bind(this);
        this.changeGender = this.changeGender.bind(this);
        this.state = {
            gender: 'male'
        };
    }

    changeDob(e, {name, value}) {
        const age = moment(value).month(0).from(moment().month(0));
        this.setState(Object.assign(this.state, {dob: value, needParent: Number(age.match(/\d+/g)) <= 16}));
        this.props.onChange(e, {name, value})
    }

    changeGender(e, {name, value}) {
        this.setState({gender: value});
        this.props.onChange(e, {name, value})

    };

    onFocusChange(event, data) {
        if (event.type === 'focus') {
            event.target.type = 'date';
            event.target.click();
        } else {
            event.target.type = 'text';
        }
    };

    render() {
        let renderParentInfo;
        const {gender} = this.state;
        if (this.state.needParent) {
            renderParentInfo = <Grid.Row centered>
                <Grid.Column width={6} textAlign='left'>
                    <Input fluid name='parent_email' error label="Parent Email" placeholder='Parent Email' required
                           onChange={this.props.onChange}/>
                </Grid.Column>
                <Grid.Column width={6} textAlign='left'>
                    <Input fluid name='parent_name' placeholder='Parent Name' error label="Parent Name" required
                           onChange={this.props.onChange}/>
                </Grid.Column>
            </Grid.Row>
        }
        return (
            <Grid className='sign-up-about-section-body'>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <p className='sign-up-label'>ABOUT</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={6} textAlign='left'>
                        <Input fluid name='first_name' label="First Name" error placeholder='First Name *' required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='left'>
                        <Input fluid name='last_name' placeholder='Last Name *' error label="Last Name" required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <Input fluid name='dob' type='text' error label="Date of birthday" placeholder='Date of birth* (mm/dd/yyyy)'
                               onFocus={this.onFocusChange}
                               onBlur={this.onFocusChange} required onChange={this.changeDob}/>
                    </Grid.Column>
                </Grid.Row>
                {renderParentInfo}
                <Grid.Row centered>
                    <Grid.Column width={6} textAlign='left'>
                        <Select  label={'Country'} labeled={true} fluid name='country' onChange={this.props.onChange} placeholder='Select your country' options={CountryList} required/>
                        {/*<Input fluid name='country' type='text' placeholder='Country' required*/}
                        {/*onChange={this.props.onChange}/>*/}
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='left'>
                        <Input fluid name='city' type='text' placeholder='City' error label="City" required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <span>Gender</span>
                        <Radio
                            label='Male'
                            name='gender'
                            value='male'
                            className='space'
                            checked={gender === 'male'}
                            onChange={this.changeGender}/>
                        <Radio
                            label='Female'
                            name='gender'
                            value='female'
                            className='space'
                            checked={gender === 'female'}
                            onChange={this.changeGender}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={6} textAlign='left'>
                        <Input fluid name='password' label="Password" error type='password' placeholder='Password *' required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='left'>
                        <Input fluid name='password_confirmation' error label="Confirm Password" type='password' placeholder='Password Confirmation *'
                               required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}