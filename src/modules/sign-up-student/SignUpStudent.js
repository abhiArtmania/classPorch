import React from 'react';
import {
  AboutSection,
  EducationSection
} from './sections';
import {Form,Grid, Checkbox, Button, Dimmer, Loader} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {signupUser, initialLogin} from '../../redux/actions';
var $ = require('jquery');

class SignUpStudent extends React.Component {

  constructor(props) {
    super(props);
    this.onChangeSkills = this.onChangeSkills.bind(this);
    this.onFormSubmitted = this.onFormSubmitted.bind(this);
    this.continue= this.continue.bind(this);
    this.state = {step:1,
		 selectedSkills: [],
		 email_:false,
		 password_:false
		 
		 };
  }

  // state = {
  //   
 ///  };
componentDidMount()
{
	this.props.initialLogin()
	
}
  onChangeSkills = (selectedSkills) => {
    this.setState({selectedSkills})
   };

  continue = (e) =>{
	 e.preventDefault(); 
    this.setState({step:2});
  }
  goBack = () =>{
	  
    this.setState({step:1});
  }
 
 setOuterState(name,value)
 {
	 
	 this.setState([name]:value)
 }
  onFormSubmitted = (event, {formData}) => {
    event.preventDefault();

    const formSkills = this.state.selectedSkills.map(x => {
      return {id: x.key, name: x.text}
    });

    const {
      email,
      password,
      first_name,
      last_name,
      gender,
      country,
      city,
      mobile,
      grade,
      state,
      start_education,
      finish_education,
      college_name,
    } = this.state;
	const password_confirmation=password;
    //Modify form data for actual use:
    let parsedForm = {
      user: {
        educations_attributes: {
          '0': {
            university_name: college_name,
            grade
          }
        },
        role: 'student',
        email,
        password,
        password_confirmation,
        first_name,
        last_name,
        gender,
        country,
        city,
        number: mobile,
        skills: formSkills
      }
    };

    if (this.props.errorObject) {
      const { provider, access_token, secret } = this.props.errorObject;
      parsedForm = {
        user: {
          ...parsedForm.user,
          provider: provider || 'email'
        },
        auth: {
          access_token: access_token || null,
          secret: secret || null
        }
      }
    }

    this.props.signupUser(parsedForm);
  };

  onChange = (event) => {
	
    this.setState({[event.target.name]: event.target.value});
  };
   onSelectChange = ({name,value}) => {

    this.setState({[name]: value});
  };
setPhone(phone)
{
	
	this.setState({mobile:phone.value})
}
  render() {
    return (
    <div>
    {this.props.loading &&   <div style={{position:"fixed", top:"0",bottom:"0",left:"0",right:"0"}}><Dimmer active inverted>
					<Loader inverted>Loading</Loader>
				</Dimmer>
      </div>}
    <div style={{margin:"0 auto", color:"red", textAlign:"center"}}>{this.props.errorMessage}</div>
      {/* onSubmit={this.onFormSubmitted} */}
        {/* <AboutSection onChange={this.onChange}/> */}
        {(this.state.step == 1)?
          <AboutSection onSelectChange={this.onSelectChange} onChange={this.onChange}
          setPhone={this.setPhone.bind(this)}
           continue={this.continue.bind(this)}
          setOuterState={this.setOuterState.bind(this)}
           data={this.state}/>
          :<EducationSection onChange={this.onChange} onChangeSkills={this.onChangeSkills.bind(this)}
           selectedSkills={this.state.selectedSkills} onFormSubmitted={this.onFormSubmitted.bind(this)} 
           goBack={this.goBack.bind(this)} data={this.state}   seededSkills={this.props.seededSkills}
       />
        }
       
    </div>
    )
  }
}

const mapStateToProps = ({auth, profileState}) => {
  const {email, errorMessage, errorObject, loading} = auth;
  
  return {email, errorObject, errorMessage, loading}
};



export default connect(mapStateToProps, {signupUser, initialLogin})(SignUpStudent);
