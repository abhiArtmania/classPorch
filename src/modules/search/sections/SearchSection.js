import React from 'react';
import { object, string } from 'prop-types';
import {WOW} from 'wowjs/dist/wow';
import './css/animate.css';
import './css/style.css';
import './css/default.css';
import defaultAvatar from 'assets/avatar/default.png';


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
    const className = tutorInfo.online ? "online" : "";
    return (
      <div className="agent-box-list clearfix wow fadeInUp delay-03s" style={{ visibility: "hidden" }}>
        <div className="col-lg-1 col-md-1 col-sm-1  agent-box-theme-2">
          <img src={tutorInfo.image ? tutorInfo.image : defaultAvatar} alt="team-2" className="img-responsive" />
          <div className={`status ${className}`} />
        </div>
        <div className="col-lg-11 col-md-11 col-sm-11 agent-content">
          {/* Title */}
          <h1 className="title">
            <a className="pull-left">{tutorInfo.fullname}</a>
            <a className="pull-right">{tutorInfo.hourly_rate ? tutorInfo.hourly_rate: "Not Vefiried"}</a>
            <div className="clearfix" />
          </h1>
          {/* contact */}
          <p>University College London University - Biomedical Science ({tutorInfo.fullname})</p>

          <p>Subjects:
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

          <p>Ethusiastic and friendly graduate with extensive teaching and tutoring experience. Morbi accumsan ipsum velit nam nec tellus a odio tincidunt...</p>
          <p>
            <img src="/img/star-rating.jpg" alt="" style={{width: 100}} />
            <b> 21 reviews, 67 completed lessons</b>
          </p>
        </div>
      </div>
    )
  }
}

SearchSection.propTypes = {
  authToken: string.isRequired,
  tutorInfo: object.isRequired,
}

export default SearchSection
