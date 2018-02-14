import React from 'react';
import {Grid, Input, Select, Form} from 'semantic-ui-react';
import moment from 'moment';
import './styles.css';

export default class EducationSection extends React.Component {

    state = {
        startDate: moment().subtract(4, 'years').format('D-mm-Y'),
        endDate: moment().format('D-mm-Y'),
        numberOfEducationFields: 1,
        gradesList: [
            {key:'Grade 1',value:'Grade 1',text:'Grade 1'},
            {key:'Grade 2',value:'Grade 2',text:'Grade 2'},
            {key:'Grade 3',value:'Grade 3',text:'Grade 3'},
            {key:'Grade 4',value:'Grade 4',text:'Grade 4'},
            {key:'Grade 5',value:'Grade 5',text:'Grade 5'},
            {key:'Grade 6',value:'Grade 6',text:'Grade 6'},
            {key:'Grade 7',value:'Grade 7',text:'Grade 7'},
            {key:'Grade 8',value:'Grade 8',text:'Grade 8'},
            {key:'Grade 9',value:'Grade 9',text:'Grade 9'},
            {key:'Grade 10',value:'Grade 10',text:'Grade 10'},
            {key:'Grade 11',value:'Grade 11',text:'Grade 11'},
            {key:'Grade 12',value:'Grade 12',text:'Grade 12'},
            {key:'Year 1',value:'Year 1',text:'Year 1'},
            {key:'Year 2',value:'Year 2',text:'Year 2'},
            {key:'Year 3',value:'Year 3',text:'Year 3'},
            {key:'Year 4',value:'Year 4',text:'Year 4'},
        ]
    };

    onFocusChange = (event, data) => {
        if (event.type === 'focus') {
            event.target.type = 'date';
            event.target.click()
        } else {
            event.target.type = 'text'
        }
    };

    getEducations = () => {
        const {startDate, endDate, numberOfEducationFields} = this.state;
        const Educations = [];

        for (let i = 0; i < numberOfEducationFields; i++) {
            Educations.push(
                <Grid>

                </Grid>
            )
        }
        return Educations;
    };

    render() {
        return (
            <Grid className='sign-up-about-education-body'>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <p className='sign-up-label'>EDUCATION</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <Input label="School Name" type='text' name={'college_name'} fluid placeholder='Name of School'
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <Form.Select size={'large'} label="Grade" name='grade' onChange={this.props.onChange} placeholder='Select your grade'
                                options={this.state.gradesList} />
                    </Grid.Column>
                    {/*<Grid.Column width={6} textAlign='left'>*/}
                    {/*<Input fluid name={'start_education'} type='text' placeholder='Start Date * (dd/mm/yyyy)' onFocus={this.onFocusChange} min='1970-01-01' max={moment().format('Y-mm-D')} onBlur={this.onFocusChange} required onChange={this.props.onChange}/>*/}
                    {/*</Grid.Column>*/}
                    {/*<Grid.Column width={6} textAlign='left'>*/}
                    {/*<Input fluid name={'finish_education'} type='text' placeholder='End Date * (dd/mm/yyyy)' onFocus={this.onFocusChange} min='1970-01-01' max={moment().format('Y-mm-D')} onBlur={this.onFocusChange} required onChange={this.props.onChange}/>*/}
                    {/*</Grid.Column>*/}
                </Grid.Row>
            </Grid>
        );
    }
}