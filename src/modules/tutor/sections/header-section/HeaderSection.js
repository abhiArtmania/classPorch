import React from 'react';
import {history} from '../../../../redux/store';
import {connect} from 'react-redux';
import { object } from 'prop-types';
import {bookedTutor} from '../../../../redux/actions';
import {
  Grid,
  Button,
} from 'semantic-ui-react';
import './styles.css';

// import defaultAvatar  from '../../../assets/avatar/default.png';
import defaultAvatar from '../../../../assets/avatar/default.png'


import { Rating } from '../../../../components/common';

// const HeaderSection = props => {
//   const { tutorInfo, tutorId } = props;
class HeaderSection extends React.Component{

  constructor(props){
    super(props);
    
  }

render(){
  const { tutorInfo, tutorId } = this.props;
  return (
    
    <Grid className='profile-section' >
      <Grid.Row width={16}>
        <Grid.Column width={3} className='profileImage'>
          <img
            src={tutorInfo.image ? tutorInfo.image : defaultAvatar}
            alt="Tutor Avatar"
          />
        </Grid.Column>
        <Grid.Column width={13} className='userInfo'>
          <h2 className="userName">
            <div class={`userName__status ${tutorInfo.online_status}`}></div>
            <span>{tutorInfo.fullname}</span>
            <span className="pull-right">
              {tutorInfo.hourly_rate ? `$${tutorInfo.hourly_rate}/hr` : "N/A"}
            </span>
          </h2>
          {tutorInfo.educations && tutorInfo.educations.map(item => {
            return (
              <h3 className="university__text">{item.university_name}</h3>
            )
          })}

          <div>
            <div className="ui small label">
              {tutorInfo.overall_rating ? tutorInfo.overall_rating : 0}
            </div> 
            <Rating rate={tutorInfo.overall_rating} name={tutorInfo.id} />
          </div>

          <div className="ui labels subjects">
            {tutorInfo.skills && tutorInfo.skills.map(skill => {
              return (
                <span
                  key={`skill_${skill.id}`}
                  className="ui label"
                >
                  {skill.name}
                </span>
              )
            })}
          </div>

          <Button  className="session-booking-btn">Message Tutor</Button> &nbsp;
          <Button onClick={()=>{
            this.props.bookedTutor(tutorInfo);
            history.push('/session-booking/'+tutorId);
          }} className="session-booking-btn">Book a Session</Button>
       
        </Grid.Column>
      </Grid.Row>
      <div className="ui clearing divider"></div>
    </Grid>
  )
}
}

HeaderSection.propTypes = {
  tutorInfo: object.isRequired,
}

HeaderSection.defaultProps = {
  tutorInfo: {},
}

const mapActionToProps = () => {
  return {bookedTutor}
};



export default connect(null, mapActionToProps())(HeaderSection)

// export default HeaderSection
