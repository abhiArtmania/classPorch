
import React from 'react';
import { HeaderSection, ProfileSection } from './sections';
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Notification } from 'react-notification';
import {
	profileRequested,
	getDashboard,
	toggleProfileMode,
	onChangeUserInfo,
	updateProfilePicture,
	onChangeEducation,
	onChangeSkill,
	updateProfile,
	ChatActions,
} from '../../redux/actions';
import './styles.css';

class Tutor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isNotificationActive:false,
			isProfileEditedNotificationActive:false,
    }

    this.tutorId = props.route.match.params.tutorId;
	}

	componentDidMount(){
		const {authToken} = this.props;
		this.props.profileRequested(this.tutorId, authToken);
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
		const { userId, profile, authToken, educationalAttributes } = this.props;
		this.props.toggleProfileMode('normal');
		this.props.updateProfile({ profile,userId,educationalAttributes,authToken })
	};

  render(){
    const {
      userId,
      authToken,
      role,
      firstName,
      profile,
      educationalAttributes,
      lastName,
      averageRating,
      reviews,
      mode,
    } = this.props;
    return (
      <div style={{padding:'15px'}}>
        <div
          className="outerProfile-section"
          style={{width:'100%',display:'flex',flexDirection:'column', alignItems:'center' }}
        >
          <HeaderSection tutorInfo={profile} />
          <ProfileSection
            userId={userId}
            authToken={authToken}
            role={role}
            profile={profile}
            educationalAttributes={educationalAttributes}
            presentProfileId={this.tutorId}
            firstName={firstName}
            mode={mode}
            reviews={reviews} 
            toggleProfileMode={this.props.toggleProfileMode}
            onChangeUserInfo={this.props.onChangeUserInfo}
            onChangeEducation={this.props.onChangeEducation}
            onChangeSkill={this.props.onChangeSkill}
          />

          {mode ==='edit' && 
            <Button color='yellow' style={{marginBottom:'100px'}} onClick={this.onClickSave} >
              SAVE CHANGES
            </Button>
          }

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

const mapStateToProps = store => {
	const { id:userId, authToken, role, firstName, lastName } =  store.auth;
	const {
    profile,
    educationalAttributes,
    averageRating, 
    reviews,
    mode
  } = store.profileState;
	const { sessionRequestIndicator,displayMessage } = store.dashboard;

	return {
    userId,
    authToken,
    role,
    firstName,
    lastName,
    profile,
    educationalAttributes,
    averageRating,
    reviews,
    mode,
    sessionRequestIndicator,
    displayMessage
  }
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
})(Tutor);

