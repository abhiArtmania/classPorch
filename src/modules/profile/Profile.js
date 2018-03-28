import React from "react";
import {Grid, Button, Rating} from "semantic-ui-react";
import PropTypes from 'prop-types';
import './styles.css';
import profile from '../../assets/profile/profile.jpg';
import checkimg from '../../assets/profile/check.png';
import Truncate from 'react-truncate';



export default class Profile extends React.Component {
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
    render() {
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
        const showData = (item, index) => {
         return ((index < count) ? <div className="item"><img className="ui avatar image" src="http://www.psdgraphics.com/file/user-icon.jpg"/>
                                <div className="content">
                                <div className="header">{item}Paulo <Rating  defaultRating={3} maxRating={5} disabled className="rating-footer"/></div>
                                    He's also a Good
                                </div> </div> : '');
        };
         return (
            <div className="outerProfile-section">
                <Grid className={'profile-section'}>
                    <Grid.Row width={16} className=''>
                        <Grid.Column width={3} className='profileImage'>
                            <img src={profile} alt="ProfileImage"/>
                        </Grid.Column>
                        <Grid.Column width={13} className='userInfo'>
                            <h2 className="userName"> <a className="ui green circular label"></a> Andriana A. <span className="rate">$10/hr</span></h2>
                            <h3>Mphil in Philosophy(Masters)-Glasgow University </h3>
                            <div>
                                <div className="ui small label">3.0</div>
                                <Rating  defaultRating={3} maxRating={5} disabled/>
                            </div>
                            <div className="ui  labels subjects">
                            <div className="ui label">
                                AI
                            </div>
                            <div className="ui label">
                                Math
                            </div>
                            <div className="ui label">
                            English
                            </div>
                            <div className="ui label">
                                Descrete
                            </div>
                            <div className="ui label">
                                Computer Graphics
                            </div>
                            <div className="ui label">
                                Computer netwoks
                            </div>
                            </div>
                        
                        </Grid.Column>
                    </Grid.Row>
                    <div className="ui clearing divider"></div>
                    <Grid.Row  className='description'>
                        <Grid.Column width={16} >
                        <Button className="save-profile">Edit Profile</Button>
                        <Button  className="session-booking-btn">Message Tutor</Button>
                        <h2>About Me</h2>
                        
                        <div>
                            <Truncate lines={!expanded && lines} ellipsis={(<span>... <a href='#' onClick={this.toggleLines}>{more}</a></span>
                            )}  onTruncate={this.handleTruncate} >
                                {textv}
                            </Truncate>
                            {!truncated && expanded && (<span> <a href='#' onClick={this.toggleLines}>{less}</a></span>)}
                        </div>
                        </Grid.Column>
                        
                    </Grid.Row>
                    <div className="ui clearing divider"></div>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <h2>Reviews</h2>
                            <div className="total-reviews">
                                <h3>(15 Reviews)</h3>
                            </div> 
                            <div className="ui celled list">
                                {this.data.map(showData)}
                                <button class="ui button load-more" onClick={this.handleCount.bind(this)}>Load more...</button>
                            </div>
                            <div className="ui clearing divider"></div>
                        </Grid.Column>  
                        <Grid.Column width={16} >
                            <h2>Education & certification</h2>
                            <div className="ui celled list">
                                <div className="item" style={{borderTop:'none'}}>
                                    <img className="ui avatar image" src={checkimg}/>
                                    <div className="content">
                                    <div className="header">Phd <span>2009-2010</span></div>
                                    western washington University
                                    </div>
                                </div>
                                <div className="item">
                                    <img className="ui avatar image" src={checkimg}/>
                                    <div className="content">
                                    <div className="header">M-Phil <span>2007-2009</span></div>
                                        western washington University 
                                    </div>
                                </div>
                                <div className="item">
                                    <img className="ui avatar image" src={checkimg}/>
                                    <div className="content">
                                    <div className="header">M-Phil <span>2007-2009</span></div>
                                        western washington University 
                                    </div>
                                </div>
                            </div>
                            
                        </Grid.Column> 
                        
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
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}
Profile.defaultProps = {
    lines: 3,
    more: 'Read more',
    less: 'Show less'
};

Profile.propTypes = {
    text: PropTypes.node,
    lines: PropTypes.number
};