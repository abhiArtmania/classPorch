import React from 'react';
import { Link } from 'react-router-dom';
import { object, string } from 'prop-types';
import {WOW} from 'wowjs/dist/wow';
import './css/animate.css';
import './css/style.css';
import './css/default.css';
import defaultAvatar from '../../../assets/avatar/default.png';
import { Rating } from '../../../components/common';


class SearchSection extends React.Component {
  componentDidMount(){
    setTimeout(function(){
      new WOW({
        animateClass: "animated",
        offset: 100,
        mobile: !1
      }).init();
    }, 200);
  }

  render() {
    const {tutorInfo} = this.props;
    const className = tutorInfo.online_status ? "online" : "";
    return (
      <Link to={`/tutors/${tutorInfo.id}`} style={{ color: "#333" }} >
        <div
          className="agent-box-list clearfix wow fadeInUp delay-03s"
          style={{ visibility: "hidden" }}
        >
          <div className="col-lg-1 col-md-1 col-sm-1  agent-box-theme-2">
            <img src={tutorInfo.image ? tutorInfo.image : defaultAvatar} alt="team-2" className="img-responsive" />
            <div className={`status ${className}`} />
          </div>
          <div className="col-lg-11 col-md-11 col-sm-11 agent-content">
            <h1 className="title clearfix">
              <span className="pull-left text-orange">{tutorInfo.fullname}</span>
              <span className="pull-right text-orange">{tutorInfo.hourly_rate ? tutorInfo.hourly_rate: "Not Vefiried"}</span>
            </h1>

            <div className="educations">
              {tutorInfo.educations.length && tutorInfo.educations.map(item => {
                return (
                  <p key={`edu_${item.id}`}>University {item.university_name} ({`${item.start_education} - ${item.finish_educaiton}`}), {item.status}</p>
                )
              })}
            </div>

            <p>
              {tutorInfo.skills.map(skill => {
                return (
                  <span
                    key={`skill_${skill.id}`}
                    className="label label-default label-skill"
                  >
                    {skill.name}
                  </span>
                )
              })}
            </p>

            <p>{tutorInfo.bio}</p>
            <div className="wrapper__rating">
              <Rating rate={parseInt(tutorInfo.overall_rating, 10)} name={tutorInfo.id.toString()} /> ({tutorInfo.overall_rating})
              <strong> {tutorInfo.reviews.length} reviews, {tutorInfo.session_completed_count} completed sessiona</strong>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

SearchSection.propTypes = {
  authToken: string.isRequired,
  tutorInfo: object.isRequired,
}

export default SearchSection
