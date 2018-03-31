
import React from 'react'
import { AboutSegment, EducationSegment } from './segments'
import ReviewsSection from './../reviews-section/ReviewsSection'
import '../../styles.css'

const ProfileSection = props => {
  const {
    profile,
    educationalAttributes,
    userId,
    role,
    authToken,
    presentProfileId,
    mode,
    onChangeEducation,
    toggleProfileMode,
    reviews
  } = props;

  return(
    <div style={{width:'100%',paddingBottom:'5em'}} >
      <AboutSegment
        profile={profile} 
        mode={props.mode}
        presentProfileId={presentProfileId}
        userId={userId}
        toggleProfileMode={props.toggleProfileMode}
        onChangeUserInfo={props.onChangeUserInfo}
      />
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
