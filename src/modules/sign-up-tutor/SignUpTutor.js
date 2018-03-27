import React from 'react';
import {
    AboutSection,
    EducationSection
} from './sections';
import {Form, Input, Grid, Button, Dimmer, Loader} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {signupUser, initialLogin} from '../../redux/actions';

class SignUpTutor extends React.Component {

    constructor(props) {
        super(props);
        this.onFormSubmitted = this.onFormSubmitted.bind(this);
        this.onChangeEducation = this.onChangeEducation.bind(this);
        this.onChange = this.onChange.bind(this);
        this.changeStep = this.changeStep.bind(this);
        this.state = {
			 selectedSkills: [],
            educations:[],
            step: 1,
            listOfEducation: [{}],
            rate:25
        };
    }
   
	setListOfEducation(data)
	{
	this.setState({listOfEducation: data})	
	}
    changeStep = () => {
		this.props.initialLogin();
        this.setState({step: 2});
    }

    onFormSubmitted = (event, {formData}) => {
		 console.log(formData)
        event.preventDefault();
        const formSkills = this.state.selectedSkills.map(x => {
            return {id: x.key, name: x.text}
        });
        let edu = {};
        this.state.educations.map((item, key) => {
            Object.assign(edu, {[key]: item})
        });
        const {
            email,
            password,
            password_confirmation,
            first_name,
            last_name, selectedSkills: [],
            gender,
            dob,
            country,
            city,
            mobile,
            rate,
            experience
        } = this.state;
        //Modify form data for actual use:
        let parsedForm = {
            /*user: {
                education_attributes: edu,
                tutor_experience_attributes: {
                    rate,
                    experience,
                    description: ''
                },*/
                role: 'tutor',
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
            
        };
 const formData2 = new FormData();
 for(let key in parsedForm)
 {
	if(key!=="skills") formData2.append("user["+key+"]",parsedForm[key])
 }
 this.state.educations.forEach((item, i) => {
	 formData2.append("user[educations_attributes][][start_education]",item.start_education)
	 formData2.append("user[educations_attributes][][finish_education]",item.finish_education)
	 formData2.append("user[educations_attributes][][university_name]",item.university_name)
	 formData2.append("user[educations_attributes][][verification_document]",item.verification_document,item.verification_document.name)
	

	

})
formSkills.forEach(function(item)
{
	formData2.append("user[skills][][id]",item.id)
	formData2.append("user[skills][][name]",item.name)
})
  

        if (this.props.errorObject) {
            const {provider, access_token, secret} = this.props.errorObject;
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

        this.props.signupUser(formData2,"tutor");
    };

    onChange = (event, {name, value}) => {
        this.setState({[name]: value});
    };

    onChangeEducation(data) {
        this.setState({educations: data})
    }
setFile(file)
 {
	 this.setState({idFile:file})
 }
setPhone(phone)
{
	
	this.setState({mobile:phone.value})
}
  onChangeSkills = (selectedSkills) => {
    this.setState({selectedSkills})
   }
goBack()
{
	this.props.initialLogin();
	this.setState({step:1})
}
    render() {
        return (
             <div>
    {this.props.loading &&   <div style={{position:"fixed", top:"0",bottom:"0",left:"0",right:"0", zIndex:"1"}}><Dimmer active inverted>
					<Loader inverted>Loading</Loader>
				</Dimmer>
      </div>}
    
             {(this.state.step === 1)?
                <AboutSection data={this.state} onChange={this.onChange.bind(this)} nextStep={this.changeStep.bind(this)}  
                setFile={this.setFile.bind(this)}
                setPhone={this.setPhone.bind(this)} />: 
               <EducationSection data={this.state} onChange={this.onChange.bind(this)}
               onChangeEdu={this.onChangeEducation.bind(this)}
               onChangeSkills={this.onChangeSkills.bind(this)}
				selectedSkills={this.state.selectedSkills} 
                onFormSubmitted={this.onFormSubmitted.bind(this)} 
                goBack={this.goBack.bind(this)} 
                errorMessage={this.props.errorMessage}
                setListOfEducation={this.setListOfEducation.bind(this)}
                />
               }
      
                 {/* onChange={this.onChange}/> */}
                {/* <EducationSection onChange={this.onChange} onChangeEdu={this.onChangeEducation}/> */}
                {/* <SkillsSection onChangeSkills={this.onChangeSkills} selectedSkills={this.state.selectedSkills}/> */}
                {/* <HourlyRateSection onChange={this.onChange}/> */}
                {/* <BottomSection/> */}
                 {/* onClick={this.uploadFile.bind(this)}*/}
                   </div>
        )
    }
}

const mapStateToProps = ({auth}) => {
    const {email, errorObject, errorMessage, loading} = auth;
    return {email, errorObject, errorMessage, loading}
};

export default connect(mapStateToProps, {signupUser, initialLogin})(SignUpTutor);
