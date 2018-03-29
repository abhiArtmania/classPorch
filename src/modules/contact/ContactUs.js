import React from 'react';
import {Form,Grid, Checkbox, Button, Input, TextArea, Select} from 'semantic-ui-react';
import "./style.css"
//import {connect} from 'react-redux';
//import {signupUser} from '../../redux/actions';
var $ = require('jquery');

export class Contact extends React.Component {

  constructor(props) {
    super(props);
   
    this.onFormSubmitted = this.onFormSubmitted.bind(this);
	this.onChange=this.onChange.bind(this);
	this.state={
				isAgreedToTerms:false,
				categories: [
                { key: 'Category 1', value: '1', text: 'Category 1' },
                { key: 'Category 2', value: '2', text: 'Category 2' },
                { key: 'Category 3', value: '3', text: 'Category 3' },
              
            ]}
            
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
agreedToTerms()
{
	const { isAgreedToTerms } = this.state;
	this.setState({isAgreedToTerms:!isAgreedToTerms})
}
  render() {
	 const a=<span style={{color:"red"}}>*</span>
   return <div style={{marginTop:"50px"}}><Form id="contact_form" onSubmit={this.onFormSubmitted}>
			<Grid>
				 <Grid.Row centered>
      <Grid.Column width={8} textAlign="left">
     
    <div style={{ fontSize:"14px",fontWeight:"bold"}}>  Submit a request</div>
<div style={{padding:"20px 0", fontSize:"14px"}}>Please ensure you do not share any sensitive information, including passwords, credit card numbers, private keys, or API keys in the ticket itself.</div>
                 
                <div style={{width:"90%"}}>
                   <label for="name">Your name{a}</label>
                  <Form.Input name={'name'} required placeholder='John Doe' onChange={this.onChange} />
                  <label for="email">Your email address{a}</label>
                  <Form.Input name={'email'} required  placeholder='johndoe@classporch.com'/>
                  <label for="category">Select category{a}</label>
                     <Form.Select
							name ='category'
                            options={this.state.categories} 
                            placeholder="Select your category"
                            id ='categories' selection fluid
                           
                        />
                  <label for="subject">Subject{a}</label>        
                  <Form.Input name={'subject'} required   placeholder='Please enter your subject'/>
                  <p style={{fontSize:"11px", marginTop:"-15px"}}>Type a brief summary of your question or issue.</p>
                  <label for="subject">Your message{a}</label>
                  <Form.Field name={'message'} aria-required="true" control={TextArea} rows='6'/>
                  <p style={{fontSize:"11px",  marginTop:"-15px"}}> Include as much detail as possible, including the steps to reproduce, error message(s), screen shots, URLs, date/time/duration, etc. This information will accelerate our ability to help you.</p>
           
                 <Checkbox name='terms_agreed_check'  checked={this.state.isAgreedToTerms} onClick={this.agreedToTerms.bind(this)} label="By clicking this i swear..." required /> 
                  <Button type='submit' style={{margin: '5px 40%'}}>Submit</Button>
                  </div>
                  </Grid.Column>
                  
                  <Grid.Column width={4} textAlign="left">
                 <Input icon='search' name={'search'}  placeholder='search...' style={{borderRadius:"10px"}}/>
                  </Grid.Column>
                  </Grid.Row>
                  </Grid>
                  
                  
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
