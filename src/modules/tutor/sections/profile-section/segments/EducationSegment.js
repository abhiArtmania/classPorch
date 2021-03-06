import React, {Component} from 'react'
import { object } from 'prop-types';
import moment from 'moment';
import { Grid } from 'semantic-ui-react'
import '../../../styles.css'
import checkimg from '../../../../../assets/profile/check.png';

// 10:15 AM => 10
// 10:15 PM => 22
function __convertTime(time) {
  const ampm = time.split(" ")[1];
  const hour = time.split(" ")[0];
  const convertTime = ampm === "AM" ? parseInt(hour.split(":")[0], 10)
    : parseInt(hour.split(":")[0], 10) + 12;
  return convertTime;
}

function __checkAvailability(realTimesAvailable, periodTime) {
  let isAvailability = false;

  if(!realTimesAvailable || realTimesAvailable.length === 0) {
    isAvailability = false;
    return isAvailability;
  }

  for(let index = 0; index < realTimesAvailable.length; index++) {
    const start = __convertTime(realTimesAvailable[index].start_time);
    const end = __convertTime(realTimesAvailable[index].end_time);

    if (!(periodTime.end <= start || end <= periodTime.start)) {
      isAvailability = true;
      break;
    }
  }
  return isAvailability;
}

class EducationSegment extends Component {
  constructor(props) {
    super(props)
    this.periodsTime = [
      {
        id: 1,
        start: 6,
        end: 10,
        label: "6AM-10AM"
      },
      {
        id: 2,
        start: 10,
        end: 14,
        label: "10AM-2PM"
      },
      {
        id: 3,
        start: 14,
        end: 17,
        label: "2PM-5PM"
      },
      {
        id: 4,
        start: 17,
        end: 21,
        label: "5PM-9PM"
      },
    ]
  }

	getEducationBlocks = (tutorInfo) => {
		return tutorInfo.educations ? tutorInfo.educations.map(edu => {
			return (
				<Grid.Row stretched  key={`education_${edu.id}`}>
          <Grid.Column width={16} >
            <div className="ui celled list">
              <div className="item" style={{borderTop:'none', display: "flex", alignItems: "center"}}>
                <img className="ui avatar image" alt="" src={checkimg}/>
                <div className="content">
                  <div className="education__university">
                    {edu.university_name}
                  </div>
                  <div className="education__university">
                    <i className="graduation icon"></i>
                    {moment(edu.start_education).format('YYYY')}-{moment(edu.finish_educaiton).format('YYYY')}
                  </div>
                </div>
              </div>
            </div>
          </Grid.Column> 
				</Grid.Row>
			)
		})  : null;
	};

	render() {
		const educationBlocks = this.getEducationBlocks(this.props.tutorInfo);
		return (
			<Grid padded relaxed style={{width: '100%', paddingTop: 30}}>
				<Grid.Row stretched columns={2} >
          <Grid.Column width={16}> 
            <div className="ui clearing divider"></div>
            <h2 className="tutor__heading">Tutor Availability</h2>
            <div>
              <table class="ui single line table table__availability">
                <thead>
                  <tr>
                    <th></th>
                    {this.periodsTime.map(period => {
                      return <th key={`th_${period.id}`}>{period.label}</th>
                    })}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(this.props.tutorSchedule).map(day => {
                    return (
                      <tr key={day}>
                        <td style={{ textTransform: "capitalize" }}>{day}</td>
                        {this.periodsTime.map(period => {
                          const isAvailability = __checkAvailability(
                            this.props.tutorSchedule[day],
                            period
                          );
                          return (
                            <td key={`check_${period.id}`}>
                              {isAvailability ? <i class="large green checkmark icon"></i> :
                              <i class="large red close icon"></i>}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <br />
            <br />
            <div className="ui clearing divider"></div> 
          </Grid.Column>
						
					<Grid.Column width={16} textAlign='left'>
					  <h2 className="tutor__heading">Education & certification</h2>
				    {educationBlocks}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

EducationSegment.propTypes = {
  tutorSchedule: object.isRequired,
  tutorInfo: object.isRequired,
}

export default EducationSegment
