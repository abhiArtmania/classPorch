import React, {Component} from 'react'
import {Grid, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import moment from 'moment'
import '../../../styles.css'
import checkimg from '../../../../../assets/profile/check.png';


class EducationSegment extends Component {

    onClickEdit = () => {
        this.props.toggleProfileMode('edit')
    };

    onChangeField = (index, action, field, e, {value}) => {
        this.props.onChangeEducation(index, action, this.props.educationalAttributes, field, value)
    };

    onClickDelete = (index, action) => {
        this.props.onChangeEducation(index, action, this.props.educationalAttributes)
    };

    onAddEducation = (index, action) => {
        this.props.onChangeEducation(index, action, this.props.educationalAttributes)
    };

    onFocusChange = (event, data) => {
        if (event.type === 'focus') {
            event.target.type = 'date';
            event.target.click()
        } else {
            event.target.type = 'text'
        }
    };

    getEducationBlocks = (educations) => {
        const {mode, presentProfileId, userId} = this.props;
        "2017-08-20"
        id
        :
        6
        identity_document_content_type
        :
        null
        identity_document_file_name
        :
        null
        identity_document_file_size
        :
        null
        identity_document_updated_at
        :
        null
        identity_document_url
        :
        null
        start_education
        :
        "2017-08-20"
        status
        :
        null
        university_name
        :
        "vns"
        verification_document_content_type
        :
        null
        verification_document_file_name
        :
        null
        verification_document_file_size
        :
        null
        verification_document_updated_at
        :
        null
        verification_document_url
        :
        null
        return educations.map((education, i) => {
            let startYear = moment(education['start_education']).format('YYYY');
            let finishYear = moment(education['finish_education']).format('YYYY');
            return (
                <Grid.Row stretched  key={i}>
                   <Grid.Column width={16} >
                           
                            <div className="ui celled list">
                                <div className="item" style={{borderTop:'none'}}>
                                    <img className="ui avatar image" src={checkimg}/>
                                    <div className="content">
                                    <div className="header">Phd <span>{startYear}-{finishYear}</span></div>
                                   { education['university_name']}
                                    </div>
                                </div>
                                
                            </div>
                            
                        </Grid.Column> 
                </Grid.Row>
            )
        })
    };

    render() {
        const educationBlocks = this.getEducationBlocks(this.props.educations);
        const {mode, presentProfileId, userId, educations} = this.props;
        console.log(this.props);
        return (
            <Grid padded relaxed style={{width: '100%', paddingTop: 30}}>
                <Grid.Row stretched columns={2} >
                <Grid.Column width={16}> 
                        <div className="ui clearing divider"></div>
                            <h2>Tutor Availability</h2>
                            <div>
                                <table class="ui single line table">
                                    <thead>
                                        <tr>
                                            <th> </th>
                                        <th>6AM-10AM</th>
                                        <th>10AM-2PM</th>
                                        <th>2PM-5PM</th>
                                        <th>5PM-9PM</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Monday</td>
                                            <td><i class="large green checkmark icon"></i></td>
                                            <td><i class="large green checkmark icon"></i></td>
                                            <td><i class="large green checkmark icon"></i></td>
                                            <td><i class="large green checkmark icon"></i></td>
                                        
                                        </tr>
                                        <tr>
                                            <td>Tuesdays</td>
                                            <td><i class="large green checkmark icon"></i></td>
                                            <td><i class="large green checkmark icon"></i></td>
                                            <td><i class="large green checkmark icon"></i></td>
                                            <td><i class="large green checkmark icon"></i></td>
                                        
                                        </tr>
                                        <tr>
                                            <td>Wednesdays</td>
                                            <td><i class="large green checkmark icon"></i></td>
                                            <td><i class="large green checkmark icon"></i></td>
                                            <td><i class="large green checkmark icon"></i></td>
                                            <td><i class="large green checkmark icon"></i></td>
                                        
                                        </tr><tr>
                                            <td>Thursdays</td>
                                            <td><i class="large green checkmark icon"></i></td>
                                            <td><i class="large green checkmark icon"></i></td>
                                            <td><i class="large green checkmark icon"></i></td>
                                            <td><i class="large green checkmark icon"></i></td>
                                        
                                        </tr><tr>
                                            <td>Friday</td>
                                            <td><i class="large green checkmark icon"></i></td>
                                            <td><i class="large green checkmark icon"></i></td>
                                            <td><i class="large green checkmark icon"></i></td>
                                            <td><i class="large green checkmark icon"></i></td>
                                        
                                        </tr><tr>
                                            <td>Saturday</td>
                                            <td><i class="large green checkmark icon"></i></td>
                                            <td><i class="large green checkmark icon"></i></td>
                                            <td><i class="large green checkmark icon"></i></td>
                                            <td><i class="large green checkmark icon"></i></td>
                                        
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="ui clearing divider"></div> 
                        </Grid.Column>
                        
                    <Grid.Column width={16} textAlign='left'>
                    <h2>Education & certification</h2>
                    </Grid.Column>
                    
                </Grid.Row>
                {educationBlocks}
            </Grid>
        )
    }
}

const styles = {
    heading: {
        fontSize: '1.1em',
        fontWeight: 600,
        marginTop: '40px'
    },
    text: {
        fontSize: 15
    }
};

// const mapStateToProps = ({ profileState }) => {
//     const {profile} = profileState
//     return { profile }
// }

export default connect(null, {})(EducationSegment)