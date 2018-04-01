
import React from 'react'
import { AboutSegment, EducationSegment } from './segments'
import ReviewsSection from './../reviews-section/ReviewsSection'
import '../../styles.css'

const ProfileSection = props => {
  const {
    profile,
    educationalAttributes,
    userId,
    presentProfileId,
    mode,
    onChangeEducation,
    toggleProfileMode,
  } = props;

  return(
    <div style={{width:'100%',paddingBottom:'5em'}} >
      <AboutSegment data={profile} />
      <div className="ui clearing divider"></div>  
      <ReviewsSection data={profile.reviews} />
      <EducationSegment
        educationalAttributes={educationalAttributes}
        presentProfileId={presentProfileId}
        onChangeEducation={onChangeEducation}
        toggleProfileMode={toggleProfileMode}
        mode={mode}
        userId={userId}
      />
    </div>
  )
}

export default ProfileSection
