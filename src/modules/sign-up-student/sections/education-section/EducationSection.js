import React from 'react';
// import SkillsSection from '../skills-section/SkillsSection';
import BottomSection from './BottomSection';
import SkillsSection from './SkillsSection';
import { Grid, Input, Select, Form } from 'semantic-ui-react';
import moment from 'moment';
import './styles.css';

export default class EducationSection extends React.Component {

    state = {
        startDate: moment().subtract(4, 'years').format('D-mm-Y'),
        endDate: moment().format('D-mm-Y'),
        numberOfEducationFields: 1,
        selectedSkills: []
    };

    onFocusChange = (event, data) => {
        if (event.type === 'focus') {
            event.target.type = 'date';
            event.target.click()
        } else {
            event.target.type = 'text'
        }
    };


    onChange = (event, {name, value}) => {
      this.setState({[name]: value});
    };

    getEducations = () => {
        const { startDate, endDate, numberOfEducationFields } = this.state;
        const Educations = [];

        for (let i = 0; i < numberOfEducationFields; i++) {
            Educations.push(
                <Grid>

                </Grid>
            )
        }
        return Educations;
    };
onSubmit()
{
}
    render() {
		
        return (
        <Form name="signup2" encType='application/json' onSubmit={this.props.onFormSubmitted}>
          <Grid>
              <Grid.Row centered style={{marginTop:"20px"}}>
                  <Grid.Column width={8} textAlign='left'>
                    <h4 class="ui dividing header">Education</h4>
                  </Grid.Column>
              </Grid.Row>
              <Grid.Row centered>
                  <Grid.Column width={4} textAlign='left'>
                    <span>Phone</span>
                      <input fluid name='mobile' error placeholder='Phone' type='tel'  onChange={this.props.onChange}/>
                       {/* onChange={props.onChange}  Phone is optional*/}
                  </Grid.Column>
                  <Grid.Column width={4} textAlign='left'>
                    <span>School</span>
                      <input type='text' name={'college_name'} fluid placeholder='Name of School' onChange={this.props.onChange}/>
                      {/* onChange={this.props.onChange} */}
                  </Grid.Column>
              </Grid.Row>
              <SkillsSection onChangeSkills={this.props.onChangeSkills} selectedSkills={this.props.selectedSkills}/>
              <BottomSection/>
              </Grid>
               <Grid column={1} centered>
          <Grid.Column width={8} style={{padding:"20px 0"}}>
           
           <button class="ui olive button"  type='submit' onClick={this.onSubmit.bind(this)}>Submit</button>
            {/* onClick={this.Formvalidation} */}
          </Grid.Column>
        </Grid>
              </Form>


        );
    }
}
