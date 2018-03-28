
import React, {Component} from 'react'
import { AboutSegment, EducationSegment, ContactSegment, } from './segments'
import ReviewsSection from './../reviews-section/ReviewsSection'
import '../../styles.css'

class ProfileSection extends Component {

    render(){
        const { profile,educationalAttributes,userId, role, authToken, firstName, presentProfileId, mode,
                onChangeEducation, onChangeSkill, toggleProfileMode, reviews } = this.props;
        return(
            <div style={{width:'100%',paddingBottom:'5em'}} >

                <AboutSegment profile={profile} 
                    mode={this.props.mode} presentProfileId={presentProfileId} userId={userId}
                    toggleProfileMode={this.props.toggleProfileMode} onChangeUserInfo={this.props.onChangeUserInfo} />
                <div className="ui clearing divider"></div>  
                 <ReviewsSection userId={userId} authToken={authToken} role={role} profile={profile}  presentProfileId={presentProfileId}
								reviews = {reviews}  />
                
                <EducationSegment educationalAttributes={educationalAttributes} presentProfileId={presentProfileId}
                    onChangeEducation={onChangeEducation} toggleProfileMode={toggleProfileMode} mode={mode}
                    userId={userId} />
                
                

                

            </div>
        )
    }

}

export default ProfileSection

// const mapStateToProps = ({auth,profileState}) => {
//     const {profile, educationalAttributes} = profileState
//     // console.log(educationalAttributes)

//     return  {profile, educationalAttributes}
// }

// export default connect(mapStateToProps,{})(ProfileSection)

