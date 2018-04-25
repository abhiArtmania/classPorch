
import React from 'react';
import { HeaderSection,ProfileSection } from './sections';
import { Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Notification } from 'react-notification';
import { profileRequested,getDashboard, toggleProfileMode, onChangeUserInfo,updateProfilePicture,
	onChangeEducation,onChangeSkill, updateProfile, ChatActions } from '../../redux/actions';
import './styles.css';
class ProfileTutor extends React.Component {

	state = {
		isNotificationActive:false,
		isProfileEditedNotificationActive:false,
	};

	componentDidMount(){
		const {presentProfileId,authToken} = this.props;
		this.props.profileRequested(presentProfileId,authToken);
		this.props.toggleProfileMode('normal')
	}

	componentWillReceiveProps(nextProps){
		const { userId, authToken } = this.props;
		
		if(this.props.sessionRequestIndicator !== nextProps.sessionRequestIndicator){
			this.setState({ isNotificationActive:true });
			this.props.getDashboard({ userId,authToken })			
		}
		if(this.props.profileEditedIndicator !== nextProps.profileEditedIndicator){
			this.setState({ isProfileEditedNotificationActive:true })
		}
		
	}

	componentWillUmount(){
		this.props.toggleProfileMode('normal')
	}

	dismissNotification = () => {
		this.setState({ isNotificationActive :false })
	};

	dismissNotificationEdit = () => {
		this.setState({ isProfileEditedNotificationActive :false })
	};

	onClickSave = () =>  {
		console.log('test');
		const { userId, profile, authToken, educations } = this.props;
		this.props.toggleProfileMode('normal');
		this.props.updateProfile({ profile,userId,educations,authToken })
	};

    render(){
		const { userId,authToken,presentProfileId,role,firstName, profile, educations, lastName ,
			averageRating, reviews,mode, onChangeEducation, onChangeSkill,skills, fullname,verified } = this.props;
			console.log( fullname);
        return (
			<div style={{padding:'15px'}}>
				{!verified &&<Message warning>
    <Message.Header></Message.Header>
    <p>Your profile is under Review. It typically takes 24*72 hours to be Approved an verified</p>
  </Message>}
        	<div className="outerProfile-section" style={{width:'100%',display:'flex',flexDirection:'column', alignItems:'center' }} >
				<HeaderSection mode={mode} toggleProfileMode={this.props.toggleProfileMode} onChangeUserInfo={this.props.onChangeUserInfo}  onChangeEducation={onChangeEducation} onChangeSkill={onChangeSkill} userId={userId} skills={skills} fullname={fullname} averageRating={averageRating} authToken={authToken} profile={profile} presentProfileId={presentProfileId}
								role= {role} lastName = {lastName} firstName={firstName} showMessages={this.props.showMessages}
								updateProfilePicture={updateProfilePicture} />
				
              

              

                <ProfileSection userId={userId} authToken={authToken} role={role} profile={profile} educations={educations}
								presentProfileId={presentProfileId} firstName={firstName} mode={ mode} reviews = {reviews} 
								toggleProfileMode={this.props.toggleProfileMode} onChangeUserInfo={this.props.onChangeUserInfo}
								onChangeEducation={this.props.onChangeEducation} onChangeSkill = {this.props.onChangeSkill}
								/>

				{ mode==='edit' ? 
					<Button color='yellow' style={{marginBottom:'100px'}} onClick={this.onClickSave.bind(this)} >
						SAVE CHANGES
					</Button>
					: 
					null }

				<Notification
					isActive={this.state.isNotificationActive}
					message="Notification"
					action="Dismiss"
					title={this.props.displayMessage}
					dismissAfter =  {5000}
					onDismiss={ this.dismissNotification }
					onClick={ this.dismissNotification }
				/>

				<Notification
					isActive={this.state.isProfileEditedNotificationActive}
					message="Notification"
					action="Dismiss"
					title={this.props.editProfileMessage}
					dismissAfter =  {5000}
					onDismiss={ this.dismissNotificationEdit }
					onClick={ this.dismissNotificationEdit }
				/>

				
				
        	</div>
			</div>
        	);
    }
}

const mapStateToProps = ( {auth,profileState,dashboard} ) => {
	console.log(dashboard);
	const { id:userId, authToken, role, educations, firstName,skills, lastName,fullname,  } =  auth;
	const { presentProfileId, averageRating, 
			reviews, mode } = profileState;
	const { sessionRequestIndicator,displayMessage,profile ,verified} = dashboard;
	

	return { userId, authToken,role,firstName,verified, lastName, skills, presentProfileId, profile, fullname, educations, averageRating, reviews, mode,
		sessionRequestIndicator, displayMessage  }
};

export default connect(mapStateToProps, { 
	profileRequested,
	getDashboard, 
	toggleProfileMode, 
	onChangeUserInfo,
	onChangeSkill,
	onChangeEducation,
	updateProfile,
	updateProfilePicture,
	showMessages: ChatActions.showMessages
})(ProfileTutor);

