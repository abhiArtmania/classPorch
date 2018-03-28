import React from 'react'
import {connect} from 'react-redux'
import {Grid, Image, Button} from 'semantic-ui-react';
import faker from 'faker'
import {history} from '../../../redux/store';
import {setPresentProfile} from '../../../redux/actions';
import {WOW} from 'wowjs/dist/wow';
import './css/animate.css';
import './css/style.css';
import './css/default.css';


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

  onClick = (e) => {
    const userId = this.props.result.id;
    this.props.setPresentProfile({userId});
    history.push('/profile/tutor')
  };

  render() {
    const {result} = this.props;
    let className = ""
    if (result.online)
      className = "online"
    return (
      <div className="agent-box-list clearfix wow fadeInUp delay-03s" style={{ visibility: "hidden" }}>
        <div className="col-lg-1 col-md-1 col-sm-1  agent-box-theme-2">
          <img src={result.img} alt="team-2" className="img-responsive" />
          <div className={"status "+className} />
        </div>
        <div className="col-lg-11 col-md-11 col-sm-11 agent-content">
          {/* Title */}
          <h1 className="title">
            <a className="pull-left" href="#">{result.name}</a>
            <a className="pull-right" href="#">{result.rate}</a>
            <div className="clearfix" />
          </h1>
          {/* contact */}
          <p>University College London University - Biomedical Science (Bachelors)</p>
          <p>Subjects: <span className="label label-default">Maths</span> <span className="label label-default">Physics</span> <span className="label label-default">Chemistry</span> <span className="label label-default">Biology</span> <span className="label label-default">English</span></p>
          <p>Ethusiastic and friendly graduate with extensive teaching and tutoring experience. Morbi accumsan ipsum velit nam nec tellus a odio tincidunt...</p>
          <p><img src="/img/star-rating.jpg" style={{width: 100}} /> <b>21 reviews, 67 completed lessons</b></p>
        </div>
      </div>
    )
  }
}


export default connect(null, {setPresentProfile})(SearchSection)

