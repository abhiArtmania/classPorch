import React from 'react';
import {Form,Grid, Checkbox, Button, Input, TextArea} from 'semantic-ui-react';
//import {connect} from 'react-redux';
//import {signupUser} from '../../redux/actions';
var $ = require('jquery');

export class Contact extends React.Component {

  constructor(props) {
    super(props);
   
    this.onFormSubmitted = this.onFormSubmitted.bind(this);
	this.onChange=this.onChange.bind(this);
  }


  
  onFormSubmitted = (event, {formData}) => {
    event.preventDefault();

 

    const {
      email,
      password,
      password_confirmation,
      first_name,
      last_name,
      gender,
      dob,
      country,
      city,
      mobile,
      grade,
      start_education,
      finish_education,
      college_name,
    } = this.state;

    //Modify form data for actual use:

  /*  let parsedForm = {
     
        role: 'student',
        email,
        password,
        password_confirmation,
        first_name,
        last_name,
        gender,
        birthday_date: dob,
        country,
        city,
        number: mobile,
        skills: formSkills
      
    };*/

}
  onChange = (event, {name, value}) => {
    this.setState({[name]: value});
  };

  render() {
   return <div style={{marginTop:"50px"}}><Form onSubmit={this.onFormSubmitted}>
			<Grid>
				 <Grid.Row centered>
      <Grid.Column width={8} textAlign="left">
     
      Submit a request
<div style={{padding:"20px 0"}}>Please ensure you do not share any sensitive information, including passwords, credit card numbers, private keys, or API keys in the ticket itself.</div>
                 
                <div style={{width:"90%"}}>
                  <Form.Input name={'name'}  placeholder='John Doe' onChange={this.onChange} />
                  
                  <Form.Input name={'email'} placeholder='johndoe@classporch.com'/>
                  <Form.Input name={'mobile'}  placeholder='Please enter with your country code'/>
                  <Form.Field name={'message'} label='Your message' control={TextArea} rows='6'/>
           
                 
                  </div>
                  </Grid.Column>
                  
                  <Grid.Column width={4} textAlign="left">
                  hi
                  </Grid.Column>
                  </Grid.Row>
                  </Grid>
                  <Button type='submit' style={{float: 'right', marginRight: '20px'}}>Submit</Button>
                  
                </Form>
    </div>
  }
}

/*const mapStateToProps = ({auth}) => {
  //const {email, errorObject, loading} = auth;
  //return {email, errorObject, loading}
//};  </Grid.Column>
  //                <Grid.Column width={3}>
    //              hi
      //            </Grid.Column>
        //          </Grid.Row>
          //        <Button type='submit' style={{float: 'right', marginRight: '20px'}}>Submit</Button>
            //      </Grid>*/



//export default connect(mapStateToProps, {signupUser})(SignUpStudent);
