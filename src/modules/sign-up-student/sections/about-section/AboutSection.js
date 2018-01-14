import React from 'react';
import {Grid, Input, Radio} from 'semantic-ui-react';
import './styles.css';

export default class AboutSection extends React.Component {

    constructor() {
        super();
        this.changeGender = this.changeGender.bind(this);
        this.state = {
            gender: 'male'
        };
    }

    changeGender = function (e, {name, value}) {
        this.setState({gender: value});
        this.props.onChange(e, {name, value})

    };

    onFocusChange = function (event, data) {
        if (event.type === 'focus') {
            event.target.type = 'date';
            event.target.click();
        } else {
            event.target.type = 'text';
        }
    };

    render() {
        const {gender} = this.state;
        return (
            <Grid className='sign-up-about-section-body'>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <p className='sign-up-label'>ABOUT</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={6} textAlign='left'>
                        <Input fluid name='first_name' placeholder='First Name *' required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='left'>
                        <Input fluid name='last_name' placeholder='Last Name *' required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <Input fluid name='dob' type='text' placeholder='Date of birth* (dd/mm/yyyy)'
                               onFocus={this.onFocusChange}
                               onBlur={this.onFocusChange} required onChange={this.props.onChange}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={6} textAlign='left'>
                        <Input fluid name='city' type='text' placeholder='City' required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='left'>
                        <Input fluid name='country' type='text' placeholder='Country' required
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
                        <Input fluid name='password' type='password' placeholder='Password *' required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='left'>
                        <Input fluid name='password_confirmation' type='password' placeholder='Password Confirmation *'
                               required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}