
import React from 'react';
import { Button } from 'semantic-ui-react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { Notification } from 'react-notification';
import {
	getDashboard,
	toggleProfileMode,
	onChangeUserInfo,
	updateProfilePicture,
	onChangeEducation,
	onChangeSkill,
	updateProfile,
	ChatActions,
} from '../../redux/actions';
import { HeaderSection, ProfileSection } from './sections';
import { getTutorSchedule, getUserInfo } from "../../redux/actions/tutors";
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

	async componentWillMount(){
		this.props.getUserInfo(this.tutorId);
    this.props.getTutorSchedule(this.tutorId);
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
      educationalAttributes,
      reviews,
      mode,
      tutorInfo
    } = this.props;
    return (
      <div style={{padding:'15px'}}>
        <div
          className="outerProfile-section"
          style={{width:'100%',display:'flex',flexDirection:'column', alignItems:'center' }}
        >
          <HeaderSection tutorInfo={tutorInfo} />
          <ProfileSection
            userId={userId}
            authToken={authToken}
            role={role}
            tutorInfo={tutorInfo}
            educationalAttributes={educationalAttributes}
            presentProfileId={this.tutorId}
            firstName={firstName}
            mode={mode}
            reviews={reviews} 
            toggleProfileMode={this.props.toggleProfileMode}
            onChangeUserInfo={this.props.onChangeUserInfo}
            onChangeEducation={this.props.onChangeEducation}
            onChangeSkill={this.props.onChangeSkill}
            tutorSchedule={this.props.tutorSchedule}
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
  console.log(store);

	const { id:userId, authToken, role, firstName, lastName } =  store.auth;
	const {
    profile,
    educationalAttributes,
    averageRating, 
    reviews,
    mode
  } = store.profileState;
	const { sessionRequestIndicator, displayMessage } = store.dashboard;

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
    displayMessage,
    tutorSchedule: store.tutors.tutorSchedule,
    tutorInfo: store.tutors.userInfo,
  }
};

Tutor.propTypes = {
  getTutorSchedule: func.isRequired,
	getUserInfo: func.isRequired,
  tutorSchedule: object.isRequired,
  tutorInfo: object.isRequired,
}

export default connect(mapStateToProps, { 
	getDashboard, 
	toggleProfileMode, 
	onChangeUserInfo,
	onChangeSkill,
	onChangeEducation,
	updateProfile,
	updateProfilePicture,
  showMessages: ChatActions.showMessages,
	getUserInfo,
  getTutorSchedule
})(Tutor);

