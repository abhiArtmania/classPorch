
import React, {Component} from 'react'
import { Grid,Icon } from 'semantic-ui-react'
import {connect} from 'react-redux'
import SkillSelection from './SkillSelection'


class SkillSegment extends Component {

    onClickEdit = () => {
        this.props.toggleProfileMode('edit')
    };

    onChangeSkillsHandle = (editedSkills) => {
        this.props.onChangeSkill(editedSkills)
    };

    render(){
        const { userId, profile, presentProfileId, role, firstName, mode, onChangeSkill } = this.props;
        const skills  = profile['skills']? profile['skills'] : [];
        
        return(
            <Grid padded relaxed style={{width:'100%',paddingTop:30}} >
                <Grid.Row stretched columns={1} centered >
                    <Grid.Column width={12} textAlign='left' >
                        <div className='sub-heading' > 
                       
                        </div>
                    </Grid.Column>
                </Grid.Row>
                
                <Grid.Row centered>
                    <Grid.Column width={9} textAlign='left'>
                        {/* {skills} */}
                        <SkillSelection onChangeSkills={this.onChangeSkillsHandle} selectedSkills={skills} mode={mode} />
                    </Grid.Column>
                    <Grid.Column width={3} textAlign='left' >
                    {   presentProfileId === userId &&
                        <Icon name='edit' size='large' color='grey' className='edit-icon' onClick={this.onClickEdit} />
                    }                    
                    </Grid.Column>
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

export default connect(null,{ })(SkillSegment)