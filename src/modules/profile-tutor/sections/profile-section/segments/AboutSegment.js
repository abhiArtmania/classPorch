import React, {Component} from 'react'
import {Grid, Button, Rating,Input} from "semantic-ui-react";
import PropTypes from 'prop-types';
import '../../../styles.css'
import Truncate from 'react-truncate';


class AboutSegment extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            count: 5,
            defaultCount: 5,
            expanded: false,
            truncated: false
        };
        this.data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 6, 4, 3, 2, 1, 5];
        this.handleTruncate = this.handleTruncate.bind(this);
        this.toggleLines = this.toggleLines.bind(this);
    }
    handleCount() {
        let count = this.state.defaultCount;
        count = count + this.state.count;
        this.setState({ count });
      }
    handleTruncate(truncated) {
        if (this.state.truncated !== truncated) {
            this.setState({
                truncated
            });
        }
    }

    toggleLines(event) {
        event.preventDefault();

        this.setState({
            expanded: !this.state.expanded
        });
    }

    onChangeField = (field, e, {value}) => {
        this.props.onChangeUserInfo(field, value)
    };
    onChangeBio = (e,{value}) => {
        this.props.onChangeUserInfo('bio',value );
        
    
    };
    onClickEdit = () => {
        this.props.toggleProfileMode('edit')
    };


    onFocusChange = (event) => {
        if (event.type === 'focus') {
            event.target.type = 'date';
            event.target.click()
        } else {
            event.target.type = 'text'
        }
    };

    render() {
        const {profile ,mode} = this.props;

        const fullName = profile['full-name'];
        const birthdayDate = profile['birthday date'];
        const gender = profile['gender'];
        const textv = <p >Lorem Ipsum is simply dummy text of the printing and typesetting industry.
             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
             It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>;
         const {
           
            more,
            less,
            lines
        } = this.props;

        const {
            expanded,
            truncated
        } = this.state;
        const count = this.state.count;
        return (
            <Grid padded relaxed style={{width: '100%', paddingTop: 30}}>
            <Grid.Column width={16} >
                        
                        <h2>About Me</h2>
                        
                        <div>
                            <Truncate lines={!expanded && lines} ellipsis={(<span>... <a href='#' onClick={this.toggleLines}>{more}</a></span>
                            )}  onTruncate={this.handleTruncate} >
                                {this.props.profile.bio}
                            </Truncate>
                            {!truncated && expanded && (<span> <a href='#' onClick={this.toggleLines}>{less}</a></span>)}
                        </div>
                        { mode === 'edit' ? 
                            <Input className='profile-rate' value={profile['bio']} onChange={this.onChangeBio.bind(this)} type='text' /> : ''
                             }
                        </Grid.Column>
                
                
            </Grid>
        )
    }
}
AboutSegment.defaultProps = {
    lines: 3,
    more: 'Read more',
    less: 'Show less'
};

AboutSegment.propTypes = {
    text: PropTypes.node,
    lines: PropTypes.number
};
/*<Grid.Row stretched columns={1} centered>
                    <Grid.Column width={12} textAlign='left'>
                        <div className='sub-heading'> ABOUT</div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row stretched columns={2} centered>
                    <Grid.Column width={1}>
                        <Icon name='student' size='large' color='grey'/>
                    </Grid.Column>
                    <Grid.Column width={3} textAlign='left'>
                        <div className='profile-text'> {fullName} </div>
                    </Grid.Column>
                    <Grid.Column width={8} textAlign='left'/>
                </Grid.Row>
                <Grid.Row stretched columns={2} centered>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='grey'/>
                    </Grid.Column>
                    <Grid.Column width={3} textAlign='left'>
                        <div className='profile-text'> {birthdayDate} </div>
                    </Grid.Column>
                    <Grid.Column width={8} textAlign='left'/>
                </Grid.Row>
                <Grid.Row stretched columns={1} centered>
                    <Grid.Column width={1} textAlign='left'>
                        <div style={{fontWeight: 'bold'}}> Gender</div>
                    </Grid.Column>
                    <Grid.Column width={3} textAlign='left'>
                        <div className='profile-text' style={{textTransform: "capitalize"}}> {gender} </div>
                    </Grid.Column>
                    <Grid.Column width={8} textAlign='left'/>
                </Grid.Row>
*/
export default AboutSegment;