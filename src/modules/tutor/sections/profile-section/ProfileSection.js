
import React from 'react'
import { object } from 'prop-types';
import { AboutSegment, EducationSegment } from './segments'
import ReviewsSection from './../reviews-section/ReviewsSection'
import '../../styles.css'

const ProfileSection = props => {
  const {
    profile,
    tutorSchedule
  } = props;

  return(
    <div style={{width:'100%',paddingBottom:'5em'}} >
      <AboutSegment data={profile} /> 
      <ReviewsSection data={profile.reviews} />
      <EducationSegment
        tutorSchedule={tutorSchedule}
        tutorInfo={profile}
      />
    </div>
  )
}

ProfileSection.propTypes = {
  tutorSchedule: object.isRequired,
  tutorInfo: object,
}

ProfileSection.defaultProps = {
  tutorInfo: {},
}

export default ProfileSection
