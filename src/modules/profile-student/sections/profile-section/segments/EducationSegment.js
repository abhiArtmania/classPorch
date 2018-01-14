
import React, {Component} from 'react'
import { Grid,Icon, Input } from 'semantic-ui-react'
import {connect} from 'react-redux'
import moment from 'moment'
import '../../../styles.css'


class EducationSegment extends Component {

    onClickEdit = () => {
        this.props.toggleProfileMode('edit')
    };

    onClickEdit = () => {
        this.props.toggleProfileMode('edit')
    };

    onChangeField = (index,action,field,e,{value}) => {
        this.props.onChangeEducation(index,action,this.props.educationalAttributes,field,value)
    };

    onClickDelete = (index,action) => {
        this.props.onChangeEducation(index,action,this.props.educationalAttributes)
    };

    onAddEducation = (index,action) => {
        this.props.onChangeEducation(index,action,this.props.educationalAttributes)
    };

    onFocusChange = (event, data) => {
        if(event.type==='focus'){
            event.target.type = 'date';
            event.target.click()
        }else{
            event.target.type = 'text'
        }
    };

    getEducationBlocks = (educationalAttributes) => {
        const {profile,toggleProfileMode,mode, onChangeUserInfo,presentProfileId,userId} = this.props;
        
        return educationalAttributes.map((education,i) => {
            let startYear = moment(education['start-education']).format('YYYY');
            let finishYear = moment(education['finish-education']).format('YYYY');
            return(
                <Grid.Row stretched columns={3} centered key={i} >
                    <Grid.Column width={1} >
                        <Icon name='university' size='large' color='grey' />
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='left'>
                    {
                        mode==='edit'?
                        <Input className='profile-text' value={education['university-name']} 
                        placeholder='college/university name'
                        onChange={this.onChangeField.bind(this,i,'edit','university-name')} /> 
                        :
                        <div className='profile-text' > {education['university-name']} </div>
                    }
                    <br/>
                    {
                        mode==='edit'?
                        <div>
                        <Input className='profile-text' value={education['start-education']} 
                                onChange={this.onChangeField.bind(this,i,'edit','start-education')}
                                placeholder='start date'
                                onFocus={this.onFocusChange} onBlur={this.onFocusChange}  /> 

                        <Input className='profile-text' value={education['finish-education']} 
                                onChange={this.onChangeField.bind(this,i,'edit','finish-education')}
                                placeholder='finish date'
                                onFocus={this.onFocusChange} onBlur={this.onFocusChange}  /> 
                        </div>
                        :
                        <div className='profile-text' > {startYear} - {finishYear} </div>
                    }

                    </Grid.Column>
                    <Grid.Column width={5} textAlign='left' >
                    {   mode==='edit' &&
                        <Icon name='delete' size='large' color='red' className='edit-icon' 
                        onClick={this.onClickDelete.bind(this,i,'delete')} />
                    }
                    </Grid.Column>
                </Grid.Row>
            )
        })
    };

    render(){
        const educationBlocks  = this.getEducationBlocks(this.props.educationalAttributes);
        const {profile,toggleProfileMode,mode, onChangeUserInfo,presentProfileId,userId} = this.props;
        
        return(
            <Grid padded relaxed style={{width:'100%',paddingTop:30}} >
                <Grid.Row stretched columns={2} centered >
                    <Grid.Column width={6} textAlign='left' >
                        <div className='sub-heading' style={{paddingBottom:'20px'}} > EDUCATION </div>
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='left' >
                    {   presentProfileId === userId &&
                        <Icon name='edit' size='large' color='grey' className='edit-icon' onClick={this.onClickEdit}  />
                    }
                    </Grid.Column>
                </Grid.Row>
                {educationBlocks}
                <Grid.Row stretched centered >
                {   
                    mode==='edit' &&
                        <Icon name='add' size='large' color='green' className='edit-icon' 
                        onClick={this.onAddEducation.bind(this,this.props.educationalAttributes.length+1,'add')} />
                }
                </Grid.Row>
            </Grid>
        )
    }
}

const styles = {
    heading:{
        fontSize:'1.1em',
        fontWeight:600,
        marginTop:'40px'
    },
    text:{
        fontSize:15
    }
};

// const mapStateToProps = ({ profileState }) => {
//     const {profile} = profileState
//     return { profile }
// }

export default connect(null,{ })(EducationSegment)