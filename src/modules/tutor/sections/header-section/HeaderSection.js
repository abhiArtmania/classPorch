import React from 'react';
import { object } from 'prop-types';
import {
  Grid,
  Button,
} from 'semantic-ui-react';
import './styles.css';
import defaultAvatar  from 'assets/avatar/default.png';
import { Rating } from 'components/common';

const HeaderSection = props => {
  const { tutorInfo } = props;
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
              <h3>University {item.university_name} ({`${item.start_education} - ${item.finish_educaiton}`}), {item.status}</h3>
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

          <Button  className="session-booking-btn">Message Tutor</Button>
        </Grid.Column>
      </Grid.Row>
      <div className="ui clearing divider"></div>
    </Grid>
  )
}

HeaderSection.propTypes = {
  tutorInfo: object.isRequired,
}

HeaderSection.defaultProps = {
  tutorInfo: {},
}

export default HeaderSection
