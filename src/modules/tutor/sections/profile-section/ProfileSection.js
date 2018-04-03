
import React from 'react'
import { object } from 'prop-types';
import { AboutSegment, EducationSegment } from './segments'
import ReviewsSection from './../reviews-section/ReviewsSection'
import '../../styles.css'

const ProfileSection = props => {
  const {
    tutorInfo,
    tutorSchedule
  } = props;

  return(
    <div style={{width:'100%',paddingBottom:'5em'}} >
      <AboutSegment data={tutorInfo} /> 
      <ReviewsSection data={tutorInfo.reviews} />
      <EducationSegment
        tutorSchedule={tutorSchedule}
        tutorInfo={tutorInfo}
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
